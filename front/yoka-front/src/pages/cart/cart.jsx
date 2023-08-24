import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { GrDeliver } from "react-icons/gr";
import { FaWarehouse } from "react-icons/fa";

import { TranslationContext } from "../../context/translation/TranslationContext";
import "./cart.scss";
import CartForm from "../../components/cart-form/cart-form";
import CartDeliveryBtn from "../../components/cart-delivery-type/cart-delivery-btn";

export default function Cart() {
  const tr = useContext(TranslationContext);
  const { t } = useTranslation();

  const [deliveryTipe, setDeliveryTipe] = useState(true);
  const [isSelectedDelivery, setIsSelectedDelivery] = useState(false);
  const [isSelectedPickUp, setIsSelectedPickUp] = useState(true);

  const updateDelivery = () => {
    if (!isSelectedDelivery) {
      setIsSelectedDelivery(!isSelectedDelivery);
      setIsSelectedPickUp(!isSelectedPickUp);
    }
  };
  const updatePickUp = () => {
    if (!isSelectedPickUp) {
      setIsSelectedDelivery(!isSelectedDelivery);
      setIsSelectedPickUp(!isSelectedPickUp);
    }
  };


  return (
    <div className="cart-wrapper">
      <h1>{t("cart.tittle")}</h1>
      <h3>{t("cart.howToDelliver")}</h3>
      <div className="receive-order">
        <CartDeliveryBtn
          onClick={updateDelivery}
          deliveryTipe={isSelectedDelivery}
        >
          <GrDeliver />
          {t("cart.delivery")}
        </CartDeliveryBtn>
        <CartDeliveryBtn
          onClick={updatePickUp}
          deliveryTipe={isSelectedPickUp}
        >
          <FaWarehouse />
          {t("cart.pickUp")}
        </CartDeliveryBtn>
      </div>
      <div className="form">
        <CartForm deliveryTipe={deliveryTipe} />
      </div>
    </div>
  );
}
