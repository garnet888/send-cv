import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "../../../Axios";
import MyInput from "../../../ui/myInput/MyInput";
import Modal from "../../../utils/Modal/Modal";
import Loader from "../../../utils/Loader/Loader";

const schema = Yup.object().shape({
  levelID: Yup.string().required("Хоосон байна!"),
  schoolName: Yup.string().required("Хоосон байна!"),
  occupation: Yup.string().required("Хоосон байна!"),
  enterYear: Yup.string().required("Хоосон байна!"),
  endYear: Yup.string().required("Хоосон байна!"),
  gpa: Yup.string().required("Хоосон байна!"),
});

const EducationModal = ({
  title,
  userID,
  dataID,
  eduLevels,
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
      Axios.get(`/cv-edu/single/${dataID}`)
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

  const getEduLevelOptions = () => {
    let options = [];

    if (eduLevels) {
      options = [{ id: "", level: "---" }, ...eduLevels];

      return options.map((item, idx) => (
        <option key={idx} value={item.id}>
          {item.level}
        </option>
      ));
    }
  };

  const getYearOptions = () => {
    const nowYear = new Date().getFullYear();
    const years = [{ year: "---" }];

    for (let i = nowYear; i >= 1900; i--) {
      years.push({ year: i });
    }

    return years.map((item, idx) => (
      <option key={idx} value={item.id}>
        {item.year}
      </option>
    ));
  };

  const addHandler = (values) => {
    setBtnIsLoading(true);

    Axios.post(`/cv-edu/${userID}`, values)
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

    Axios.put("/cv-edu", DATA)
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
    <Modal visible={visible} onCancel={() => onCancel(btnIsLoading)}>
      <div className="cvCard-Modal">
        <h3 className="cvCard-Modal__title">{title}</h3>

        <Formik
          initialValues={{
            levelID: data.level_id,
            schoolName: data.school_name,
            occupation: data.occupation,
            enterYear: data.enter_year,
            endYear: data.end_year,
            gpa: data.gpa,
          }}
          validationSchema={schema}
          onSubmit={(vals) => saveHandler(vals)}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            setFieldTouched,
            handleChange,
            handleSubmit,
          }) => (
            <form className="myForm" onSubmit={handleSubmit}>
              <span className="myForm__row">
                <label className="myForm__row-label">Боловсролын зэрэг:</label>

                <select
                  name="levelID"
                  value={values.levelID}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                >
                  {getEduLevelOptions()}
                </select>

                {touched.levelID && errors.levelID && (
                  <label className="myInput__errorText">{errors.levelID}</label>
                )}
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">Сургуулийн нэр:</label>
                <MyInput
                  name="schoolName"
                  value={values.schoolName}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.schoolName}
                  errorText={errors.schoolName}
                />
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">Эзэмшсэн мэргэжил:</label>
                <MyInput
                  name="occupation"
                  value={values.occupation}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.occupation}
                  errorText={errors.occupation}
                />
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">Элссэн он:</label>

                <select
                  name="enterYear"
                  value={values.enterYear}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                >
                  {getYearOptions()}
                </select>

                {touched.enterYear && errors.enterYear && (
                  <label className="myInput__errorText">
                    {errors.enterYear}
                  </label>
                )}
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">Төгссөн он:</label>

                <select
                  name="endYear"
                  value={values.endYear}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                >
                  {getYearOptions()}
                </select>

                {touched.endYear && errors.endYear && (
                  <label className="myInput__errorText">{errors.endYear}</label>
                )}
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">Голч дүн:</label>
                <MyInput
                  name="gpa"
                  value={values.gpa}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.gpa}
                  errorText={errors.gpa}
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

export default EducationModal;
