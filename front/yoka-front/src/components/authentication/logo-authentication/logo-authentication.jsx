import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import './logo-authentication.scss'

export default function LogoAuthentication({message}) {

    const { t } = useTranslation();
    const navigate = useNavigate();


  return (
    <div className="logo-wrapper">
      <AiOutlineArrowLeft
        onClick={() => navigate(-1)}
        className="arrow-back"
        size={30}
      />
      <div className="logo-signin">
        <Link to="/">
          <img
            src={`${process.env.REACT_APP_API_URL}/download/ZMA6SoxU-1685475573141.jpg`}
            alt="YOKA"
            className="background-image"
          />
        </Link>
        <h2>{message}</h2>
      </div>
    </div>
  );
}
