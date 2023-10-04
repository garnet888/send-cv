import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import MyInput from "../../../ui/myInput/MyInput";
import Modal from "../../../utils/Modal/Modal";
import Loader from "../../../utils/Loader/Loader";

const schema = Yup.object().shape({
  skill: Yup.string().required("Хоосон байна!"),
  level: Yup.string()
    .matches(/^[0-9]*$/, "Зөвхөн тоо бичнэ үү!")
    .required("Хоосон байна!"),
});

const JobSkillModal = ({ title, visible, onCancel }) => {
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const saveHandler = (values) => {
    setBtnIsLoading(false);

    console.log("Job Skill Modal=>", values);
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <div className="cvCard-Modal">
        <h3 className="cvCard-Modal__title">{title}</h3>

        <Formik
          initialValues={{ skill: "", level: "" }}
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
                <label className="myForm__row-label">Түвшин (0%-100%):</label>
                <MyInput
                  name="level"
                  value={values.level}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.level}
                  errorText={errors.level}
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

export default JobSkillModal;
