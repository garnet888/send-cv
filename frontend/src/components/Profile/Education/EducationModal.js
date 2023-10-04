import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import MyInput from "../../../ui/myInput/MyInput";
import Modal from "../../../utils/Modal/Modal";
import Loader from "../../../utils/Loader/Loader";

const schema = Yup.object().shape({
  level: Yup.string().required("Хоосон байна!"),
  schoolName: Yup.string().required("Хоосон байна!"),
  occupation: Yup.string().required("Хоосон байна!"),
  enterDate: Yup.string().required("Хоосон байна!"),
  endDate: Yup.string().required("Хоосон байна!"),
  gpa: Yup.string().required("Хоосон байна!"),
});

const EducationModal = ({ title, visible, onCancel }) => {
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const saveHandler = (values) => {
    setBtnIsLoading(false);

    console.log("Education Modal=>", values);
  };

  return (
    <Modal visible={visible} onCancel={() => onCancel(btnIsLoading)}>
      <div className="cvCard-Modal">
        <h3 className="cvCard-Modal__title">{title}</h3>

        <Formik
          initialValues={{
            level: "",
            schoolName: "",
            occupation: "",
            enterDate: "",
            endDate: "",
            gpa: "",
          }}
          validationSchema={schema}
          onSubmit={(vals) => saveHandler(vals)}
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
                <MyInput
                  name="level"
                  value={values.level}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.level}
                  errorText={errors.level}
                />
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
                <MyInput
                  name="enterDate"
                  value={values.enterDate}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.enterDate}
                  errorText={errors.enterDate}
                />
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">Төгссөн он:</label>
                <MyInput
                  name="endDate"
                  value={values.endDate}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.endDate}
                  errorText={errors.endDate}
                />
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
