import React from "react";
import LogoAuthentication from "../../components/authentication/logo-authentication/logo-authentication";
import { useTranslation } from "react-i18next";

import './register.scss'
import SignUp from "../../components/authentication/sign-up/sign-up";

export default function Register() {
  const { t } = useTranslation();
  return (
    <div className="register">
      <div className="form-logo">
        <LogoAuthentication message={t("authentication.message")} />
      </div>
      <div className="form">
        <SignUp />
      </div>
    </div>
  );
}
