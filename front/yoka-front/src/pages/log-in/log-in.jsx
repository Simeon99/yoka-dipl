import React from "react";

import { Link, Route, useNavigate } from "react-router-dom";

import { AiOutlineArrowLeft } from "react-icons/ai";

import "./log-in.scss";
import { useTranslation } from "react-i18next";
import SignUp from "../../components/authentication/sign-up/sign-up";
import LogoAuthentication from "../../components/authentication/logo-authentication/logo-authentication";
import SignIn from "../../components/authentication/sign-in/sign-in";

export default function LogIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="sign-in">
      <div className="form-logo">
        <LogoAuthentication message={t("authentication.message")} />
      </div>
      <div className="form-signin">
        <SignIn />
      </div>
    </div>
  );
}
