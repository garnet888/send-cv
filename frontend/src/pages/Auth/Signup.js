import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import MyInput from "../../ui/myInput/MyInput";
import Popup from "../../utils/Popup/Popup";
import Loader from "../../utils/Loader/Loader";

const _logo = require("../../assets/logo.png");

const schema = Yup.object().shape({
  firstname: Yup.string()
    .matches(/^[A-Z][a-z0-9_-]*$/, "Эхний үсэг том байх ёстой!")
    .required("Хоосон байна!"),
  lastname: Yup.string()
    .matches(/^[A-Z][a-z0-9_-]*$/, "Эхний үсэг том байх ёстой!")
    .required("Хоосон байна!"),
  phonenumber: Yup.string()
    .matches(/^[0-9]*$/, "Зөвхөн тоо бичнэ үү!")
    .min(8, "Урт багадаа 8 байх ёстой!")
    .max(8, "8-аас их байж болохгүй!")
    .required("Хоосон байна!"),
  email: Yup.string()
    .email("Зөв форматаар бичнэ үү!")
    .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Зөв форматаар бичнэ үү!")
    .required("Хоосон байна!"),
  password: Yup.string()
    .min(8, "Хамгийн багадаа 8 тэмдэгт байх ёстой!")
    .required("Хоосон байна!"),
  repassword: Yup.string()
    .min(8, "Хамгийн багадаа 8 тэмдэгт байх ёстой!")
    .oneOf([Yup.ref("password")], "Таарахгүй байна!")
    .required("Хоосон байна!"),
});

const Signup = () => {
  const navigate = useNavigate();

  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);

  const signupHandler = (values) => {
    setBtnIsLoading(false);

    setPopupType("success");
    setPopupText("Амжилттай бүртгэгдлээ. Бүртгэлээрээ нэвтэрч орно уу");
    setVisiblePopup(true);

    console.log("Signup=>", values);
  };

  const popupOnOK = () => {
    if (popupType === "success") {
      navigate("/login");
    } else if (popupType === "error") {
      setVisiblePopup(false);
      setBtnIsLoading(false);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="authAccount">
      <Popup
        messageType={popupType}
        messageText={popupText}
        visible={visiblePopup}
        onOk={() => popupOnOK()}
      />

      <img className="authAccount__logo" src={_logo} alt="no file" />

      <b className="authAccount__title">Бүртгүүлэх</b>

      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          phonenumber: "",
          email: "",
          password: "",
          repassword: "",
        }}
        validationSchema={schema}
        onSubmit={(vals) => signupHandler(vals)}
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

            <span className="myForm__row">
              <label className="myForm__row-label">Нууц үг:</label>
              <MyInput
                name="password"
                value={values.password}
                type="password"
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.password}
                errorText={errors.password}
              />
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Нууц үг давтах:</label>
              <MyInput
                name="repassword"
                value={values.repassword}
                type="password"
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.repassword}
                errorText={errors.repassword}
              />
            </span>

            {btnIsLoading ? (
              <Loader mini />
            ) : (
              <button className="authAccount__button" type="submit">
                Бүртгүүлэх
              </button>
            )}

            <Link className="authAccount__link" to="/login">
              Нэвтрэх
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
