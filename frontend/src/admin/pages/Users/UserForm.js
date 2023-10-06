import React, { useEffect, useState } from "react";
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
import Modal from "../../../utils/Modal/Modal";
import MyCV from "../../../pages/Profile/MyCV";

const schema = Yup.object().shape({
  firstname: Yup.string()
    .matches(/^[A-Z][a-z0-9_-]*$/, "Эхний үсэг том байх ёстой!")
    .required("Хоосон байна!"),
  lastname: Yup.string()
    .matches(/^[A-Z][a-z0-9_-]*$/, "Эхний үсэг том байх ёстой!")
    .required("Хоосон байна!"),
  birthDate: Yup.string().required("Хоосон байна!"),
  register: Yup.string()
    .min(10, "Урт багадаа 10 байх ёстой!")
    .max(10, "10-аас их байж болохгүй!")
    .required("Хоосон байна!"),
  gender: Yup.string().required("Хоосон байна!"),
  phonenumber: Yup.string()
    .matches(/^[0-9]*$/, "Зөвхөн тоо бичнэ үү!")
    .min(8, "Урт багадаа 8 байх ёстой!")
    .max(8, "8-аас их байж болохгүй!")
    .required("Хоосон байна!"),
  email: Yup.string()
    .email("Зөв форматаар бичнэ үү!")
    .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Зөв форматаар бичнэ үү!")
    .required("Хоосон байна!"),
});

const UserForm = () => {
  const { adminConfig } = useAdminContext();
  const { id } = useParams();

  const [data, setData] = useState({});

  const [showCV, setShowCV] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);

  useEffect(() => {
    if (id === "add") {
      setData({});
      setIsLoading(false);
    } else {
      Axios.get(`/users/byID/${id}`, adminConfig)
        .then((res) => {
          console.log("DATA=>", res.data);

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
  }, [adminConfig, id]);

  const saveHandler = (values) => {
    setBtnIsLoading(false);

    console.log("Personal info=>", values);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Card centered>
      <Popup
        messageType={popupType}
        messageText={popupText}
        visible={visiblePopup}
        onOk={() => window.location.reload()}
      />

      <Modal visible={showCV} onCancel={setShowCV}>
        <MyCV />
      </Modal>

      <Formik
        initialValues={{
          firstname: data.firstname,
          lastname: data.lastname,
          birthDate: data.birth_date,
          register: data.register,
          gender: data.gender,
          phonenumber: data.phonenumber,
          email: data.email,
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
            <button
              className="outline-btn"
              type="button"
              onClick={() => setShowCV(true)}
            >
              Анкет харах
            </button>

            <span className="myForm__row">
              <label className="myForm__row-label">Овог:</label>
              <MyInput
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.lastname}
                errorText={errors.lastname}
              />
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Нэр:</label>
              <MyInput
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.firstname}
                errorText={errors.firstname}
              />
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Төрсөн огноо:</label>
              <MyInput
                name="birthDate"
                value={values.birthDate}
                type="date"
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.birthDate}
                errorText={errors.birthDate}
              />
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Регистрийн дугаар:</label>
              <MyInput
                name="register"
                value={values.register}
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.register}
                errorText={errors.register}
              />
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Хүйс:</label>

              <span className="myForm__row-radioGroup">
                <MyRadio
                  label="Эрэгтэй"
                  name="gender"
                  value="male"
                  checked={values.gender === "male"}
                  onChange={() => setFieldValue("gender", "male")}
                />
                <MyRadio
                  label="Эмэгтэй"
                  name="gender"
                  value="female"
                  checked={values.gender === "female"}
                  onChange={() => setFieldValue("gender", "female")}
                />
              </span>

              {touched.gender && errors.gender && (
                <label className="myInput__errorText">{errors.gender}</label>
              )}
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Утасны дугаар:</label>
              <MyInput
                name="phonenumber"
                value={values.phonenumber}
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.phonenumber}
                errorText={errors.phonenumber}
              />
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">И-мэйл хаяг:</label>
              <MyInput
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.email}
                errorText={errors.email}
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

export default UserForm;
