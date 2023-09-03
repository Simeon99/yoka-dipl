import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import CartPickUp from "../cart-pickup/cart-pickup";
import CartDelivery from "../cart-delivery/cart-delivery";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { UserContext } from "../../../context/user/UserContext";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./cart-form.scss";
import CustomButton from "../../custom-button/custom-button.component";
import { CartContext } from "../../../providers/cart.provider";

export default function CartForm({ deliveryTipe }) {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const { cartItems } = useContext(CartContext);

  const [totalPrice, setTotalprice] = useState(0);
  const [addresses, setAddresses] = useState();
  const [selectedAddress, setSelectedAddress] = useState();

  const submitOrder =() =>{
    console.log("Cart items: ", cartItems, "user: ", user, "delivery tipe: ",deliveryTipe, " Address: ",selectedAddress )
  }

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/address`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => {
        console.log(res.data);
        setAddresses(res.data);
        console.log("RESS", res.data[0].id);
        setSelectedAddress(res?.data[0]);
        console.log("SSSSSSSSSSSSSSSSSS", selectedAddress?.id);
      })
      .catch((error) => {
        console.log("ERRORR", error);
      });
  };

  useEffect(() => {
    setTotalprice(
      cartItems.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.quantity * currentItem.price,
        0
      )
    );
    fetchData();
  }, [cartItems]);

  return (
    <div>
      {user ? (
        <div className="adress-cart-wrapper">
          <div>
            <h1>{t("account.adress")}</h1>
          </div>
          <div className="user-address-list">
            {addresses?.map((address) => {
              return (
                <div
                  onClick={() => setSelectedAddress(address)}
                  className={`user-adress-cart ${
                    selectedAddress?.id === address?.id ? "is-selected" : ""
                  }`}
                >
                  <div className="user-address-details">
                    <div className="detail">
                      <span className="bold">
                        {t("cart.form.adress") + ": "}
                      </span>{" "}
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
                </div>
              );
            })}
          </div>
          <CustomButton onClick={submitOrder}>{t("cart.form.submit")} {totalPrice} &euro;</CustomButton>
        </div>
      ) : (
        <div>{deliveryTipe ? <CartDelivery /> : <CartPickUp />}</div>
      )}
    </div>
  );
}
