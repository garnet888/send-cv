import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAdminContext } from "../../../context/AdminContext";
import Axios from "../../../Axios";
import MyInput from "../../../ui/myInput/MyInput";
import MyRadio from "../../../ui/myRadio/MyRadio";
import Loader from "../../../utils/Loader/Loader";
import Card from "../../utils/Card/Card";
import Popup from "../../../utils/Popup/Popup";

const schema = Yup.object().shape({
  name: Yup.string().required("Хоосон байна!"),
  jobTypeID: Yup.string().required("Хоосон байна!"),
  wkTimeTypeID: Yup.string().required("Хоосон байна!"),
  minSalary: Yup.string()
    .matches(/^[0-9]*$/, "Зөвхөн тоо бичнэ үү!")
    .required("Хоосон байна!"),
  maxSalary: Yup.string()
    .matches(/^[0-9]*$/, "Зөвхөн тоо бичнэ үү!")
    .required("Хоосон байна!"),
  isNegotiable: Yup.string().required("Хоосон байна!"),
  duty: Yup.string().required("Хоосон байна!"),
  requirement: Yup.string().required("Хоосон байна!"),
});

const JobForm = () => {
  const { adminConfig } = useAdminContext();
  const { id } = useParams();

  const [data, setData] = useState({});
  const [jobTypes, setJobTypes] = useState([]);
  const [timeTypes, setTimeTypes] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);

  const getJobTypes = useCallback(() => {
    Axios.get("/jobs/job-types")
      .then((res) => setJobTypes(res.data))
      .catch(() => {
        setPopupType("sys_error");
        setPopupText("");
        setVisiblePopup(true);
      });
  }, []);

  const getTimeTypes = useCallback(() => {
    Axios.get("/jobs/wk-time-types")
      .then((res) => setTimeTypes(res.data))
      .catch(() => {
        setPopupType("sys_error");
        setPopupText("");
        setVisiblePopup(true);
      });
  }, []);

  const getDATA = useCallback(() => {
    if (id === "add") {
      getJobTypes();
      getTimeTypes();

      setData({});
      setIsLoading(false);
    } else {
      Axios.get(`/jobs/${id}`, adminConfig)
        .then((res) => {
          getJobTypes();
          getTimeTypes();

          setData(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);

          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        });
    }
  }, [adminConfig, id, getJobTypes, getTimeTypes]);

  useEffect(() => {
    getDATA();
  }, [getDATA]);

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

  const addHandler = (values) => {
    setBtnIsLoading(true);

    Axios.post("/jobs", values, adminConfig)
      .then((res) => {
        if (res.data.message === "success") {
          window.location.replace("/admin/jobs");
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

    const DATA = { id, ...values };

    Axios.put("/jobs", DATA, adminConfig)
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
    if (id === "add") {
      addHandler(values);
    } else {
      editHandler(values);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Card centered>
      {console.log("jobs=>", data)}
      <Popup
        messageType={popupType}
        messageText={popupText}
        visible={visiblePopup}
        onOk={() => window.location.reload()}
      />

      <Formik
        initialValues={{
          name: data.name,
          jobTypeID: data.job_type_id,
          wkTimeTypeID: data.wk_time_type_id,
          minSalary: data.min_salary,
          maxSalary: data.max_salary,
          isNegotiable: data.is_negotiable,
          duty: data.duty,
          requirement: data.requirement,
        }}
        validationSchema={schema}
        onSubmit={(vals) => saveHandler(vals)}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          handleChange,
          handleSubmit,
        }) => (
          <form className="myForm" onSubmit={handleSubmit}>
            <span className="myForm__row">
              <label className="myForm__row-label">Нэр:</label>
              <MyInput
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.name}
                errorText={errors.name}
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
              <label className="myForm__row-label">Ажлын чиглэл:</label>

              <select
                name="jobTypeID"
                value={values.jobTypeID}
                onChange={handleChange}
                onBlur={setFieldTouched}
              >
                {getJobTypeOptions()}
              </select>

              {touched.jobTypeID && errors.jobTypeID && (
                <label className="myInput__errorText">{errors.jobTypeID}</label>
              )}
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Доод цалин:</label>
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
              <label className="myForm__row-label">Дээд цалин:</label>
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
              <label className="myForm__row-label">
                Цалин тохиролцох эсэх:
              </label>

              <span className="myForm__row-radioGroup">
                <MyRadio
                  label="Тийм"
                  name="isNegotiable"
                  value={true}
                  checked={values.isNegotiable === true}
                  onChange={() => setFieldValue("isNegotiable", true)}
                />
                <MyRadio
                  label="Үгүй"
                  name="isNegotiable"
                  value={false}
                  checked={values.isNegotiable === false}
                  onChange={() => setFieldValue("isNegotiable", false)}
                />
              </span>

              {touched.isNegotiable && errors.isNegotiable && (
                <label className="myInput__errorText">
                  {errors.isNegotiable}
                </label>
              )}
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Гүйцэтгэх үүрэг:</label>
              <MyInput
                name="duty"
                value={values.duty}
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.duty}
                errorText={errors.duty}
                isTextarea
                rows={3}
              />
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Тавигдах шаардлага:</label>
              <MyInput
                name="requirement"
                value={values.requirement}
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.requirement}
                errorText={errors.requirement}
                isTextarea
                rows={5}
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
    </Card>
  );
};

export default JobForm;
