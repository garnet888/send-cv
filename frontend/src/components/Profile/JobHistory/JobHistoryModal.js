import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "../../../Axios";
import MyInput from "../../../ui/myInput/MyInput";
import Modal from "../../../utils/Modal/Modal";
import Loader from "../../../utils/Loader/Loader";

const schema = Yup.object().shape({
  companyName: Yup.string().required("Хоосон байна!"),
  jobTypeID: Yup.string().required("Хоосон байна!"),
  position: Yup.string().required("Хоосон байна!"),
  salary: Yup.string()
    .matches(/^[0-9]*$/, "Зөвхөн тоо бичнэ үү!")
    .required("Хоосон байна!"),
  enterDate: Yup.string().required("Хоосон байна!"),
  leaveDate: Yup.string().required("Хоосон байна!"),
});

const JobHistoryModal = ({
  title,
  userID,
  dataID,
  jobTypes,
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
      Axios.get(`/cv-job-his/single/${dataID}`)
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

  const getJobTypesOptions = () => {
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

  const addHandler = (values) => {
    setBtnIsLoading(true);

    Axios.post(`/cv-job-his/${userID}`, values)
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

    Axios.put("/cv-job-his", DATA)
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
            companyName: data.company_name,
            jobTypeID: data.job_type_id,
            position: data.job_position,
            salary: data.salary,
            enterDate: data.enter_date,
            leaveDate: data.leave_date,
          }}
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

                <select
                  name="jobTypeID"
                  value={values.jobTypeID}
                  onChange={handleChange}
                  onBlur={setFieldTouched}
                >
                  {getJobTypesOptions()}
                </select>

                {touched.jobTypeID && errors.jobTypeID && (
                  <label className="myInput__errorText">
                    {errors.jobTypeID}
                  </label>
                )}
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
                  type="month"
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
                  type="month"
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
