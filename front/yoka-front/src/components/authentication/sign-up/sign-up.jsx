import React from "react";

import "./sign-up.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../input/input";
import CustomButton from "../../custom-button/custom-button.component";
import { BarLoader } from "react-spinners";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function SignUp() {
  const { t } = useTranslation();

  const [userExist, setUserExist] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    phone: "",
    touched: {
      firstName: false,
      lastName: false,
      username: false,
      email: false,
      password: false,
      repeatPassword: false,
      phone: false,
    },
    inValid: {
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
      repeatPassword: true,
      phone: true,
    },
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (value < 1) {
      setFormState((prevState) => ({
        ...prevState,
        [id]: value,
        touched: {
          ...prevState.touched,
          [id]: true,
        },
        inValid: {
          ...prevState.inValid,
          [id]: true,
        },
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [id]: value,
        touched: {
          ...prevState.touched,
          [id]: true,
        },
        inValid: {
          ...prevState.inValid,
          [id]: false,
        },
      }));
    }
  };

  const register = (e) => {
    e.preventDefault();
    const data = {
      firstName: formState.firstName,
      lastName: formState.lastName,
      username: formState.username,
      email: formState.email,
      password: formState.password,
      repeatPassword: formState.repeatPassword,
      phone: formState.phone,
    };
    if (data.password === data.repeatPassword) {
      setPasswordNotMatch(false);
      console.log(data);
      doRegister(data);
    } else {
      setPasswordNotMatch(true);
    }
  };

  const doRegister = (data) => {
    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, data)
      .then((response) => {
        const userData = response.data;

        console.log("BABABABA", userData);
        navigate(`/`);
        toast.success(t("authentication.accountCreated"));
      })
      .catch((error) => {
        setUserExist(true);
        setErrorMessage(error.response.data);
        toast.error(t("authentication.accountFailed"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="sign-up-wrapper">
      <form onSubmit={register}>
        <div class="row">
          <Input
            col="col-md-12"
            forLable="firstName"
            label={t("cart.form.firstName")}
            type="text"
            className="form-control"
            value={formState.firstName}
            handleChange={handleInputChange}
            placeholder={t("cart.form.firstName")}
            isInValid={
              formState.touched.firstName && formState.inValid.firstName
            }
          />
          <Input
            col="col-md-12"
            forLable="lastName"
            label={t("cart.form.lastName")}
            type="lastName"
            className="form-control"
            value={formState.lastName}
            handleChange={handleInputChange}
            placeholder={t("cart.form.lastName")}
            isInValid={formState.touched.lastName && formState.inValid.lastName}
          />
        </div>
        <Input
          forLable="email"
          label={t("cart.form.email")}
          type="email"
          className="form-control"
          value={formState.email}
          handleChange={handleInputChange}
          placeholder={t("cart.form.email")}
          isInValid={formState.touched.email && formState.inValid.email}
        />
        <Input
          forLable="username"
          label={t("cart.form.username")}
          type="username"
          className="form-control"
          value={formState.username}
          handleChange={handleInputChange}
          placeholder={t("cart.form.username")}
          isInValid={formState.touched.username && formState.inValid.username}
        />
        <Input
          forLable="phone"
          label={t("cart.form.phone")}
          type="text"
          className="form-control"
          value={formState.phone}
          handleChange={handleInputChange}
          placeholder={"+381 ** *** ****"}
          isInValid={formState.touched.phone && formState.inValid.phone}
        />
        <Input
          forLable="password"
          label={t("cart.form.password")}
          type="password"
          error={passwordNotMatch}
          className="form-control"
          value={formState.password}
          handleChange={handleInputChange}
          placeholder={t("cart.form.password")}
          isInValid={formState.touched.password && formState.inValid.password}
        />
        <Input
          forLable="repeatPassword"
          label={t("cart.form.repeatPassword")}
          type="password"
          error={passwordNotMatch}
          className="form-control"
          value={formState.repeatPassword}
          handleChange={handleInputChange}
          placeholder={t("cart.form.repeatPassword")}
          isInValid={
            formState.touched.repeatPassword && formState.inValid.repeatPassword
          }
        />
        {passwordNotMatch ? (
          <div class="alert alert-danger" role="alert">
            {t("authentication.passwordNotMatch")}
          </div>
        ) : (
          ""
        )}
        {errorMessage === "Email is already taken!" ? (
          <div class="alert alert-danger" role="alert">
            {t("authentication.emailExist")}
          </div>
        ) : errorMessage === "Username is already taken!" ? (
          <div class="alert alert-danger" role="alert">
            {t("authentication.usernameExist")}
          </div>
        ) : (
          ""
        )}

        <div
          class={`button-wrapper ${
            formState.inValid.usernameOrEmail || formState.inValid.password
              ? "not-alowed"
              : ""
          }`}
          style={
            formState.inValid.usernameOrEmail || formState.inValid.password
              ? { cursor: "not-allowed" }
              : { cursor: "pointer" }
          }
        >
          <CustomButton
            type="submit"
            unclickable={
              formState.inValid.usernameOrEmail || formState.inValid.password
            }
          >
            {t("cart.form.submit")}
          </CustomButton>
        </div>
      </form>
      <BarLoader
        height={5}
        className="bar-loader"
        color="black"
        loading={loading}
        cssOverride={{
          width: "100%",
          marginTop: "5px",
        }}
        speedMultiplier={1.5}
      />
      <div>
        <Toaster />
      </div>
    </div>
  );
}
