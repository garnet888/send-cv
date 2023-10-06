import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "../../../../Axios";
import MyInput from "../../../../ui/myInput/MyInput";
import Modal from "../../../../utils/Modal/Modal";
import Loader from "../../../../utils/Loader/Loader";

const schema = Yup.object().shape({
  skill: Yup.string().required("Хоосон байна!"),
});

const SubSkillModal = ({
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
      Axios.get(`/cv-sub-skill/single/${dataID}`)
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

  const addHandler = (values) => {
    setBtnIsLoading(true);

    Axios.post(`/cv-sub-skill/${userID}`, values)
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

    Axios.put("/cv-sub-skill", DATA)
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
            <form className="myForm subSkill-content" onSubmit={handleSubmit}>
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

export default SubSkillModal;
