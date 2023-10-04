import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "../../../Axios";
import MyInput from "../../../ui/myInput/MyInput";
import Loader from "../../../utils/Loader/Loader";
import Card from "../../utils/Card/Card";
import Popup from "../../../utils/Popup/Popup";

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

const UserForm = () => {
  const { id } = useParams();

  const [data, setData] = useState({});

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
      Axios.get(`/users/${id}`)
        .then((res) => {
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
  }, [id]);

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

      <Formik
        initialValues={{
          firstname: data?.name,
          lastname: data?.username,
          phonenumber: data?.email,
          email: data?.address?.zipcode,
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
    </Card>
  );
};

export default UserForm;
