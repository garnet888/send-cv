import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import MyInput from "../../../ui/myInput/MyInput";
import Modal from "../../../utils/Modal/Modal";
import Loader from "../../../utils/Loader/Loader";
import Axios from "../../../Axios";

const schema = Yup.object().shape({
  maxSalary: Yup.string()
    .matches(/^[0-9]*$/, "Зөвхөн тоо бичнэ үү!")
    .required("Хоосон байна!"),
  minSalary: Yup.string()
    .matches(/^[0-9]*$/, "Зөвхөн тоо бичнэ үү!")
    .required("Хоосон байна!"),
  wkTimeTypeID: Yup.string().required("Хоосон байна!"),
  jobTypeID: Yup.string().required("Хоосон байна!"),
});

const PlanningJobModal = ({
  title,
  userID,
  data,
  jobTypes,
  timeTypes,
  setPopupType,
  setPopupText,
  setVisiblePopup,
  visible,
  onCancel,
}) => {
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const getTimeTypeOptions = () => {
    let options = [];

    if (timeTypes) {
      options = [{ id: "", type: "---" }, ...timeTypes];

      return options.map((item, idx) => (
        <option key={idx} value={item.id}>
          {item.type}
        </option>
      ));
    }
  };

  const getJobTypeOptions = () => {
    let options = [];

    if (jobTypes) {
      options = [{ id: "", type: "---" }, ...jobTypes];

      return options.map((item, idx) => (
        <option key={idx} value={item.id}>
          {item.type}
        </option>
      ));
    }
  };

  const saveHandler = (values) => {
    setBtnIsLoading(true);

    const DATA = {
      id: data.id,
      ...values,
    };

    Axios.post(`/plan-job/${userID}`, DATA)
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

  return (
    <Modal visible={visible} onCancel={() => onCancel(btnIsLoading)}>
      <div className="cvCard-Modal">
        <h3 className="cvCard-Modal__title">{title}</h3>

        <Formik
          initialValues={{
            maxSalary: data.max_salary,
            minSalary: data.min_salary,
            wkTimeTypeID: data.wk_time_type_id,
            jobTypeID: data.job_type_id,
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
                <label className="myForm__row-label">Ажиллах цагийн төрөл:</label>

                <select
                  name="wkTimeTypeID"
                  value={values.wkTimeTypeID}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                >
                  {getTimeTypeOptions()}
                </select>

                {touched.wkTimeTypeID && errors.wkTimeTypeID && (
                  <label className="myInput__errorText">
                    {errors.wkTimeTypeID}
                  </label>
                )}
              </span>

              <span className="myForm__row">
                <label className="myForm__row-label">
                  Ажиллахаар төлөвлөж буй чиглэл:
                </label>

                <select
                  name="jobTypeID"
                  value={values.jobTypeID}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                >
                  {getJobTypeOptions()}
                </select>

                {touched.jobTypeID && errors.jobTypeID && (
                  <label className="myInput__errorText">
                    {errors.jobTypeID}
                  </label>
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

export default PlanningJobModal;
