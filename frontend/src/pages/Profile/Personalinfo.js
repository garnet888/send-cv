import React, { useEffect, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import MyInput from "../../ui/myInput/MyInput";
import Loader from "../../utils/Loader/Loader";
import Popup from "../../utils/Popup/Popup";
import FileUploader from "../../ui/fileUploader/FileUploader";

const _userIcn = require("../../assets/user-icon.png");

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
});

/*=======================================================================*/
const _userPhoto = "https://images5.alphacoders.com/132/1328421.png";
// const _userPhoto = "";
/*=======================================================================*/

const Personalinfo = () => {
  const [previewIMG, setPreviewIMG] = useState(_userIcn);
  const [selectedIMG, setSelectedIMG] = useState(null);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);

  useEffect(() => {
    setData({});
    setIsLoading(false);

    if (_userPhoto) {
      setPreviewIMG(_userPhoto);
      setSelectedIMG(_userPhoto);
    } else {
      setPreviewIMG(_userIcn);
    }
  }, [_userPhoto]);

  const saveHandler = (values) => {
    setBtnIsLoading(false);

    setPopupType("success");
    setPopupText("Амжилттай хадгалагдлаа");
    setVisiblePopup(true);

    console.log("Selected image=>", selectedIMG);
    console.log("Personal info=>", values);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="profile">
      <Popup
        messageType={popupType}
        messageText={popupText}
        visible={visiblePopup}
        onOk={() => window.location.reload()}
      />

      <b className="profile__title">Хувийн мэдээлэл</b>

      <figure className="profile__avatar">
        <img
          id="avatar"
          className={`profile__avatar-img ${selectedIMG || "noAvatar"}`}
          src={previewIMG}
          alt="no file"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = _userIcn;
          }}
        />

        <div className="profile__avatar-upload">
          <FileUploader
            text={<BsCameraFill />}
            getFile={setSelectedIMG}
            getPreviewIMG={setPreviewIMG}
            noBtn
          />
        </div>
      </figure>

      <Formik
        initialValues={{
          firstname: data.firstname,
          lastname: data.lastname,
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
          setFieldTouched,
          handleChange,
          handleSubmit,
        }) => (
          <form className="myForm" onSubmit={handleSubmit}>
            <span className="myForm__row">
              <label className="myForm__row-label">Овог:</label>
              <MyInput
                name="lastname"
                value={values.lastname ? values.lastname : ""}
                onChange={handleChange}
                onBlur={() => setFieldTouched("lastname")}
                touched={touched.lastname}
                errorText={errors.lastname}
              />
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Нэр:</label>
              <MyInput
                name="firstname"
                value={values.firstname ? values.firstname : ""}
                onChange={handleChange}
                onBlur={() => setFieldTouched("firstname")}
                touched={touched.firstname}
                errorText={errors.firstname}
              />
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">Утасны дугаар:</label>
              <MyInput
                name="phonenumber"
                value={values.phonenumber ? values.phonenumber : ""}
                onChange={handleChange}
                onBlur={() => setFieldTouched("phonenumber")}
                touched={touched.phonenumber}
                errorText={errors.phonenumber}
              />
            </span>

            <span className="myForm__row">
              <label className="myForm__row-label">И-мэйл хаяг:</label>
              <MyInput
                name="email"
                value={values.email ? values.email : ""}
                onChange={handleChange}
                onBlur={() => setFieldTouched("email")}
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
