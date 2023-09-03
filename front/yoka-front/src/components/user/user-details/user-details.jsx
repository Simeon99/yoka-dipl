import React from "react";

import "./user-details.scss";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../context/user/UserContext";
import { useContext } from "react";
import AdressModal from "../adress-modal/adress-modal";
import UserAddress from "../user-address/user-address";

export default function UserDetails() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState();
  

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="user-details-wrapper">
      
      <AdressModal openModal={openModal} modalIsOpen={modalIsOpen} afterOpenModal={afterOpenModal} closeModal={closeModal} subtitle={subtitle}/>
      <h1>{t("account.accountDetails")}</h1>
      <div className="user-details">
        <div className="detail">
          <span className="bold">{t("cart.form.firstName") + ": "}</span>{" "}
          <span>{user.userResponse.firstName}</span>
        </div>
        <div className="detail">
          <span className="bold">{t("cart.form.lastName") + ": "}</span>{" "}
          <span>{user.userResponse.lastName}</span>
        </div>
        <div className="detail">
          <span className="bold">{t("cart.form.username") + ": "}</span>{" "}
          <span>{user.userResponse.username}</span>
        </div>
        <div className="detail">
          <span className="bold">{t("cart.form.email") + ": "}</span>{" "}
          <span>{user.userResponse.email}</span>
        </div>
        <div className="detail">
          <span className="bold">{t("cart.form.phone") + ": "}</span>{" "}
          <span>{user.userResponse.phone}</span>
        </div>
      </div>
      <h1>{t("account.adress")}</h1>
        <UserAddress openModal={openModal}/>

      
    </div>
  );
}
