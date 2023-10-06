import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAdminContext } from "../../context/AdminContext";
import MyInput from "../../ui/myInput/MyInput";
import Loader from "../../utils/Loader/Loader";

const _logo = require("../../assets/logo.png");

const schema = Yup.object().shape({
  username: Yup.string().required("Хоосон байна!"),
  password: Yup.string()
    .min(8, "Хамгийн багадаа 8 тэмдэгт байх ёстой!")
    .required("Хоосон байна!"),
});

const AdminLogin = () => {
  const { isLoading, loginHandler } = useAdminContext();

  return (
    <div className="adminLogin">
      <div className="adminLogin__container">
        <img className="adminLogin__container-logo" src={_logo} alt="no file" />

        <Formik
          initialValues={{ username: "", password: "" }}
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
                name="username"
                placeholder="Хэрэглэгчийн нэр"
                value={values.username}
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.username}
                errorText={errors.username}
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

              {isLoading ? (
                <Loader mini />
              ) : (
                <button type="submit">Нэвтрэх</button>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminLogin;
