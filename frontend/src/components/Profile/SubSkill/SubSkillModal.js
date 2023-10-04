import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import MyInput from "../../../ui/myInput/MyInput";
import Modal from "../../../utils/Modal/Modal";
import Loader from "../../../utils/Loader/Loader";

const schema = Yup.object().shape({
  skill: Yup.string().required("Хоосон байна!"),
});

const SubSkillModal = ({ title, visible, onCancel }) => {
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const saveHandler = (values) => {
    setBtnIsLoading(false);

    console.log("Sub Skill Modal=>", values);
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <div className="cvCard-Modal">
        <h3 className="cvCard-Modal__title">{title}</h3>

        <Formik
          initialValues={{ skill: "" }}
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
