import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "../../../../Axios";
import MyInput from "../../../../ui/myInput/MyInput";
import Modal from "../../../../utils/Modal/Modal";
import Loader from "../../../../utils/Loader/Loader";

const schema = Yup.object().shape({
  skill: Yup.string().required("Хоосон байна!"),
  level: Yup.string()
    .matches(/^[0-9]*$/, "Зөвхөн тоо бичнэ үү!")
    .required("Хоосон байна!"),
});

const JobSkillModal = ({
  title,
  userID,
  dataID,
  setPopupType,
  setPopupText,
  setVisiblePopup,
  visible,
  onCancel,
}) => {
  const [data, setData] = useState({});
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  useEffect(() => {
    if (visible && dataID) {
      Axios.get(`/cv-job-skill/single/${dataID}`)
        .then((res) => {
          setData(res.data);
        })
        .catch(() => {
          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        });
    } else {
      setData({});
    }
  }, [visible, dataID, setPopupType, setPopupText, setVisiblePopup]);

  const getLevelsOptions = () => {
    const levels = [{ level: "---" }];

    for (let i = 1; i <= 10; i++) {
      levels.push({ level: i * 10 });
    }

    return levels.map((item, idx) => (
      <option key={idx} value={item.level}>
        {item.level === "---" ? item.level : `${item.level}%`}
      </option>
    ));
  };

  const addHandler = (values) => {
    setBtnIsLoading(true);

    Axios.post(`/cv-job-skill/${userID}`, values)
      .then((res) => {
        if (res.data.message === "success") {
          window.location.reload();
        } else {
          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        }
      })
      .catch(() => {
        setPopupType("sys_error");
        setPopupText("");
        setVisiblePopup(true);
      });
  };

  const editHandler = (values) => {
    setBtnIsLoading(true);

    const DATA = {
      id: dataID,
      ...values,
    };

    Axios.put("/cv-job-skill", DATA)
      .then((res) => {
        if (res.data.message === "success") {
          window.location.reload();
        } else {
          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        }
      })
      .catch(() => {
        setPopupType("sys_error");
        setPopupText("");
        setVisiblePopup(true);
      });
  };

  const saveHandler = (values) => {
    if (dataID) {
      editHandler(values);
    } else {
      addHandler(values);
    }
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <div className="cvCard-Modal">
        <h3 className="cvCard-Modal__title">{title}</h3>

        <Formik
          initialValues={data}
          validationSchema={schema}
          onSubmit={(vals) => saveHandler(vals)}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            setFieldTouched,
            handleChange,
            handleSubmit,
          }) => (
            <form className="myForm jobSkill-content" onSubmit={handleSubmit}>
              <span className="myForm__row">
                <label className="myForm__row-label">Ур чадвар:</label>
                <MyInput
                  name="skill"
                  value={values.skill}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.skill}
                  errorText={errors.skill}
                />
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">Түвшин:</label>

                <select
                  name="level"
                  value={values.level}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                >
                  {getLevelsOptions()}
                </select>

                {touched.level && errors.level && (
                  <label className="myInput__errorText">{errors.level}</label>
                )}
              </span>

              {btnIsLoading ? (
                <Loader mini />
              ) : (
                <button className="profile__button" type="submit">
                  Хадгалах
                </button>
              )}
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default JobSkillModal;
