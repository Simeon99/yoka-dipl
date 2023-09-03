import React, { useEffect, useState } from "react";

import "./user-address.scss";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { UserContext } from "../../../context/user/UserContext";

import CustomButton from "../../custom-button/custom-button.component";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";

export default function UserAddress({ openModal }) {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const [addresses, setAddresses] = useState();

  function deleteAddress(id) {
    console.log();
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/address/${id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => {
        setAddresses(addresses.filter((adress) => adress.id !== id));
      })
      .catch((error) => {
        console.log("ADASDASDASDASD", error);
      });
  }

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/address`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => {
        console.log(res.data);
        setAddresses(res.data);
      })
      .catch((error) => {
        console.log("ADASDASDASDASD", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [openModal]);

  return (
    <div>
      {addresses?.length > 0 ? (
        <div className="user-adress-wrapper">
          <div className="add-user-address">
            <div className="detail">
              <h4>{t("account.addAddress")}</h4>
              <CustomButton onClick={openModal}>
                {t("account.add")}
              </CustomButton>
            </div>
          </div>
          {addresses.map((address) => {
            return (
              <div className="user-adress">
                <div className="user-address-details">
                  <div className="detail">
                    <span className="bold">{t("cart.form.adress") + ": "}</span>{" "}
                    <span>{address.street}</span>
                  </div>
                  <div className="detail">
                    <span className="bold">{t("cart.form.city") + ": "}</span>{" "}
                    <span>{address.city}</span>
                  </div>
                  <div className="detail">
                    <span className="bold">
                      {t("cart.form.country") + ": "}
                    </span>{" "}
                    <span>{address.country}</span>
                  </div>
                </div>
                <div className="icon-del-address">
                  <RiDeleteBin5Line onClick={() => deleteAddress(address.id)} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="user-adress no-address">
            <h4>No address</h4>
            <CustomButton onClick={openModal}>
              {t("account.addAddress")}
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
