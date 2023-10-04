import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import MyInput from "../../../ui/myInput/MyInput";
import Modal from "../../../utils/Modal/Modal";
import Loader from "../../../utils/Loader/Loader";

const schema = Yup.object().shape({
  maxSalary: Yup.string()
    .matches(/^[0-9]*$/, "Зөвхөн тоо бичнэ үү!")
    .required("Хоосон байна!"),
  minSalary: Yup.string()
    .matches(/^[0-9]*$/, "Зөвхөн тоо бичнэ үү!")
    .required("Хоосон байна!"),
  wkTimeType: Yup.string().required("Хоосон байна!"),
  jobType: Yup.string().required("Хоосон байна!"),
});

const PlanningJobModal = ({ title, visible, onCancel }) => {
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const saveHandler = (values) => {
    setBtnIsLoading(false);

    console.log("Planning Job Modal=>", values);
  };

  return (
    <Modal visible={visible} onCancel={() => onCancel(btnIsLoading)}>
      <div className="cvCard-Modal">
        <h3 className="cvCard-Modal__title">{title}</h3>

        <Formik
          initialValues={{
            maxSalary: "",
            minSalary: "",
            wkTimeType: "",
            jobType: "",
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
            <form
              className="myForm planningJob-content"
              onSubmit={handleSubmit}
            >
              <span className="myForm__row">
                <label className="myForm__row-label">
                  Цалингийн доод хэмжээ:
                </label>
                <MyInput
                  name="minSalary"
                  value={values.minSalary}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.minSalary}
                  errorText={errors.minSalary}
                />
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">
                  Цалингийн дээд хэмжээ:
                </label>
                <MyInput
                  name="maxSalary"
                  value={values.maxSalary}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.maxSalary}
                  errorText={errors.maxSalary}
                />
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">Ажиллах төрөл:</label>
                <MyInput
                  name="wkTimeType"
                  value={values.wkTimeType}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.wkTimeType}
                  errorText={errors.wkTimeType}
                />
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">
                  Ажиллахаар төлөвлөж буй чиглэл:
                </label>
                <MyInput
                  name="jobType"
                  value={values.jobType}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.jobType}
                  errorText={errors.jobType}
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

export default PlanningJobModal;
