import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import MyInput from "../../ui/myInput/MyInput";
import Popup from "../../utils/Popup/Popup";
import Loader from "../../utils/Loader/Loader";

const schema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, "Хамгийн багадаа 8 тэмдэгт байх ёстой!")
    .required("Хоосон байна!"),
  newPassword: Yup.string()
    .min(8, "Хамгийн багадаа 8 тэмдэгт байх ёстой!")
    .required("Хоосон байна!"),
  newRepassword: Yup.string()
    .min(8, "Хамгийн багадаа 8 тэмдэгт байх ёстой!")
    .oneOf([Yup.ref("newPassword")], "Таарахгүй байна!")
    .required("Хоосон байна!"),
});

const ChangePassword = () => {
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);

  const saveHandler = (values) => {
    setBtnIsLoading(false);

    setPopupType("success");
    setPopupText("Амжилттай хадгалагдлаа");
    setVisiblePopup(true);

    console.log("Change password=>", values);
  };

  const popupOnOK = () => {
    if (popupType === "error") {
      setVisiblePopup(false);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="profile">
      <Popup
        messageType={popupType}
        messageText={popupText}
        visible={visiblePopup}
        onOk={() => popupOnOK()}
        onCancel={() => setVisiblePopup(btnIsLoading)}
      />

      <b className="profile__title">Нууц үг солих</b>

      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          newRepassword: "",
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
          <form className="myForm" onSubmit={handleSubmit}>
            <span className="myForm__row">
              <label className="myForm__row-label">Хуучин нууц үг:</label>
              <MyInput
                name="oldPassword"
                value={values.oldPassword}
                type="password"
                onChange={handleChange}
                onBlur={() => setFieldTouched("oldPassword")}
                touched={touched.oldPassword}
                errorText={errors.oldPassword}
              />
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Шинэ нууц үг:</label>
              <MyInput
                name="newPassword"
                value={values.newPassword}
                type="password"
                onChange={handleChange}
                onBlur={() => setFieldTouched("newPassword")}
                touched={touched.newPassword}
                errorText={errors.newPassword}
              />
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Шинэ нууц үг давтах:</label>
              <MyInput
                name="newRepassword"
                value={values.newRepassword}
                type="password"
                onChange={handleChange}
                onBlur={() => setFieldTouched("newRepassword")}
                touched={touched.newRepassword}
                errorText={errors.newRepassword}
              />
            </span>

            {btnIsLoading ? (
              <Loader mini />
            ) : (
              <button className="profile__button" type="submit">
                Солих
              </button>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
