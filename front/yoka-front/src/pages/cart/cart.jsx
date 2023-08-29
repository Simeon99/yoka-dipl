import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbTruckDelivery } from "react-icons/tb";
import { FaWarehouse } from "react-icons/fa";

import { TranslationContext } from "../../context/translation/TranslationContext";
import "./cart.scss";
import CartForm from "../../components/cart-checkout/cart-form/cart-form";
import CartDeliveryBtn from "../../components/cart-checkout/cart-delivery-type/cart-delivery-btn";

export default function Cart() {
  const tr = useContext(TranslationContext);
  const { t } = useTranslation();

  const [deliveryTipe, setDeliveryTipe] = useState(false);
  const [isSelectedDelivery, setIsSelectedDelivery] = useState(false);
  const [isSelectedPickUp, setIsSelectedPickUp] = useState(true);

  const updateDelivery = () => {
    if (!isSelectedDelivery) {
      setIsSelectedDelivery(!isSelectedDelivery);
      setIsSelectedPickUp(!isSelectedPickUp);
      setDeliveryTipe(true)
    }
  };
  const updatePickUp = () => {
    if (!isSelectedPickUp) {
      setIsSelectedDelivery(!isSelectedDelivery);
      setIsSelectedPickUp(!isSelectedPickUp);
      setDeliveryTipe(false)
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
          <TbTruckDelivery />
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
