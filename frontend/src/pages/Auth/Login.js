import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import MyInput from "../../ui/myInput/MyInput";
import Loader from "../../utils/Loader/Loader";

const _logo = require("../../assets/logo.png");

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Зөв форматаар бичнэ үү!")
    .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Зөв форматаар бичнэ үү!")
    .required("Хоосон байна!"),
  password: Yup.string()
    .min(8, "Хамгийн багадаа 8 тэмдэгт байх ёстой!")
    .required("Хоосон байна!"),
});

const Login = () => {
  // const { isLoading, loginHandler, errorText } = useAuthContext();

  const isLoading = false;
  const errorText = "Буруу хаяг байна!";

  const loginHandler = (values) => {
    console.log("Login=>", values);
  };

  return (
    <div className="authAccount">
      <img className="authAccount__logo" src={_logo} alt="no file" />

      <b className="authAccount__title">Нэвтрэх</b>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={(vals) => loginHandler(vals)}
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
            <MyInput
              name="email"
              placeholder="И-мэйл"
              value={values.email}
              onChange={handleChange}
              onBlur={setFieldTouched}
              touched={touched.email}
              errorText={errors.email}
            />
            <MyInput
              name="password"
              placeholder="Нууц үг"
              value={values.password}
              type="password"
              onChange={handleChange}
              onBlur={setFieldTouched}
              touched={touched.password}
              errorText={errors.password}
            />

            <b className="authAccount__errorText">{errorText}</b>

            {isLoading ? (
              <Loader mini />
            ) : (
              <button type="submit">Нэвтрэх</button>
            )}

            <Link className="authAccount__link" to="/signup">
              Бүртгүүлэх
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
