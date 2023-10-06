import React, { useEffect, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../../context/AuthContext";
import Axios from "../../Axios";
import MyInput from "../../ui/myInput/MyInput";
import MyRadio from "../../ui/myRadio/MyRadio";
import Loader from "../../utils/Loader/Loader";
import Popup from "../../utils/Popup/Popup";
import ChangeAvatarModal from "../../components/Profile/ChangeAvatarModal/ChangeAvatarModal";
import moment from "moment/moment";

const _userIcn = require("../../assets/user-icon.png");

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
  address: Yup.string().required("Хоосон байна!"),
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

const Personalinfo = () => {
  const { authConfig } = useAuthContext();

  const [data, setData] = useState({});

  const [showChangeAvatar, setShowChangeAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const [visibleSysError, setVisibleSysError] = useState(false);

  useEffect(() => {
    Axios.get("/auth/me", authConfig)
      .then((res) => {
        setIsLoading(false);
        setData(res.data);
      })
      .catch(() => setVisibleSysError(true));
  }, [authConfig]);

  const saveHandler = (values) => {
    setBtnIsLoading(true);

    const DATA = {
      photo: data.photo,
      firstname: values.firstname,
      lastname: values.lastname,
      birthDate: values.birthDate,
      register: values.register,
      gender: values.gender,
      address: values.address,
      phonenumber: values.phonenumber,
      email: values.email,
    };

    Axios.put("/users/update", DATA, authConfig)
      .then((res) => {
        if (res.data.message === "success") {
          window.location.reload();
        } else {
          setVisibleSysError(true);
        }
      })
      .catch(() => setVisibleSysError(true));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="profile">
      <Popup
        messageType="sys_error"
        visible={visibleSysError}
        onOk={() => window.location.reload()}
      />

      <ChangeAvatarModal
        authConfig={authConfig}
        data={data}
        avatar={data.photo}
        setVisibleSysError={setVisibleSysError}
        visible={showChangeAvatar}
        onCancel={setShowChangeAvatar}
      />

      <b className="profile__title">Хувийн мэдээлэл</b>

      <figure className="profile__avatar">
        <img
          id="avatar"
          className="profile__avatar-img"
          src={data.photo ? data.photo : _userIcn}
          alt="no file"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = _userIcn;
          }}
        />

        <button
          className="profile__avatar-upload"
          onClick={() => setShowChangeAvatar(true)}
        >
          <BsCameraFill />
        </button>
      </figure>

      <Formik
        initialValues={{
          firstname: data.firstname,
          lastname: data.lastname,
          birthDate: data.birth_date,
          register: data.register,
          gender: data.gender,
          address: data.address,
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
                value={moment(values.birthDate).format("YYYY-MM-DD")}
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
              <label className="myForm__row-label">Гэрийн хаяг:</label>
              <MyInput
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={setFieldTouched}
                touched={touched.address}
                errorText={errors.address}
                isTextarea
                rows={3}
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
  );
};

export default Personalinfo;
