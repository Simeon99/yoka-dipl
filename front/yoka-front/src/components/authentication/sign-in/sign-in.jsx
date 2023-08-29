import React, { useState } from 'react'

import Input from "../../input/input";

import CustomButton from "../../custom-button/custom-button.component";

import './sign-in.scss'
import { useTranslation } from 'react-i18next';

export default function SignIn() {

  const { t } = useTranslation();

  const [formState, setFormState] = useState({
    usernameOrEmail: "",
    password: "",
    touched: {
      usernameOrEmail: false,
      password: false,
    },
    inValid: {
      usernameOrEmail: true,
      password: true,

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

  function handleSubmit(e) {
    e.preventDefault();
    if (
      formState.inValid.usernameOrEmail ||
      formState.inValid.password 
    )
      console.log(
        "Account",
        formState.usernameOrEmail,
        formState.password,
      );
      
  }

  return (
    <div className='signi-in-wrapper'>
      <form onSubmit={handleSubmit}>
        <div class="row">
          <Input
            col="col-md-12"
            forLable="usernameOrEmail"
            label={t("authentication.usernameOrEmail")}
            type="text"
            className="form-control"
            value={formState.usernameOrEmail}
            handleChange={handleInputChange}
            placeholder={t("authentication.usernameOrEmail")}
            isInValid={
              formState.touched.usernameOrEmail && formState.inValid.usernameOrEmail
            }
          />
          <Input
            col="col-md-12"
            forLable="password"
            label={t("authentication.password")}
            type="password"
            className="form-control"
            value={formState.password}
            handleChange={handleInputChange}
            placeholder={t("authentication.password")}
            isInValid={formState.touched.password && formState.inValid.password}
          />
        </div>
      
        <div
          class={`button-wrapper ${
            formState.inValid.usernameOrEmail ||
            formState.inValid.password
              ? "not-alowed"
              : ""
          }`}
          style={
            formState.inValid.usernameOrEmail ||
            formState.inValid.password
              ? { cursor: "not-allowed" }
              : { cursor: "pointer" }
          }
        >
          <CustomButton
            type="submit"
            unclickable={
              formState.inValid.usernameOrEmail ||
              formState.inValid.password
            }
          >
            {t("cart.form.submit")}
          </CustomButton>
        </div>
      </form>
    </div>
  )
}
