import React from "react";

import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";

import { ImUser } from "react-icons/im";

import "./profile.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import UserOrders from "../../components/user/user-orders/user-orders";
import UserDetails from "../../components/user/user-details/user-details";

export default function Profile() {
  const { user } = useContext(UserContext);

  const { t } = useTranslation();

  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-header-wrapper">
        <div className="profile-header">
          <ImUser className="icon-user" size={50} />
          <span className="user-name">
            {user.userResponse.firstName + " " + user.userResponse.lastName}
          </span>
          <span>{user.userResponse.email}</span>
          <hr />
          <div className="buttons-wrapper">
            <span
              className={`select-button ${
                selectedButton === 1 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(1)}
            >
              {t("account.showOrders")}
            </span>
            <span
              className={`select-button ${
                selectedButton === 2 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(2)}
            >
              {t("account.accountDetails")}
            </span>
          
          </div>
        </div>
      </div>
     
      <div className="profile-body">
        {selectedButton === 1 ? (
          <div>
            <UserOrders />
          </div>
        ) : (
          <div>
            <UserDetails />
          </div>
        )}
      </div>
    </div>
  );
}
