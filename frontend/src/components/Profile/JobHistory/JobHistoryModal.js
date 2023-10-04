import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import MyInput from "../../../ui/myInput/MyInput";
import Modal from "../../../utils/Modal/Modal";
import Loader from "../../../utils/Loader/Loader";

const schema = Yup.object().shape({
  companyName: Yup.string().required("Хоосон байна!"),
  jobType: Yup.string().required("Хоосон байна!"),
  position: Yup.string().required("Хоосон байна!"),
  salary: Yup.string()
    .matches(/^[0-9]*$/, "Зөвхөн тоо бичнэ үү!")
    .required("Хоосон байна!"),
  enterDate: Yup.string().required("Хоосон байна!"),
  leaveDate: Yup.string().required("Хоосон байна!"),
});

const JobHistoryModal = ({ title, visible, onCancel }) => {
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const saveHandler = (values) => {
    setBtnIsLoading(false);

    console.log("Job History Modal=>", values);
  };

  return (
    <Modal visible={visible} onCancel={() => onCancel(btnIsLoading)}>
      <div className="cvCard-Modal">
        <h3 className="cvCard-Modal__title">{title}</h3>

        <Formik
          initialValues={{
            companyName: "",
            jobType: "",
            position: "",
            salary: "",
            enterDate: "",
            leaveDate: "",
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
            <form className="myForm jobHistory-content" onSubmit={handleSubmit}>
              <span className="myForm__row">
                <label className="myForm__row-label">Байгууллагын нэр:</label>
                <MyInput
                  name="companyName"
                  value={values.companyName}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.companyName}
                  errorText={errors.companyName}
                />
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">
                  Байгууллагын салбар:
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

              <span className="myForm__row">
                <label className="myForm__row-label">Албан тушаал:</label>
                <MyInput
                  name="position"
                  value={values.position}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.position}
                  errorText={errors.position}
                />
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">Цалин:</label>
                <MyInput
                  name="salary"
                  value={values.salary}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.salary}
                  errorText={errors.salary}
                />
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">Ажилд орсон огноо:</label>
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
                <label className="myForm__row-label">
                  Ажлаас гарсан огноо:
                </label>
                <MyInput
                  name="leaveDate"
                  value={values.leaveDate}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                  touched={touched.leaveDate}
                  errorText={errors.leaveDate}
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

export default JobHistoryModal;
