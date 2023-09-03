import React from "react";
import { useTranslation } from "react-i18next";

import { FaUserCheck } from "react-icons/fa";

import "./header-user.scss";
import { useNavigate } from "react-router-dom";

export default function HeaderUser({ user, logOut }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="header-user">
      <div className="header-account" onClick={()=> {navigate("/account")}}>
        <FaUserCheck size={20} />

        <span>{user.userResponse.firstName + " " + user.userResponse.lastName}</span>
      </div>

      <div
        onClick={logOut}
        className="logout-btn"
      >
        <span>{t("app.header.logOut")}</span>
      </div>
    </div>
  );
}
