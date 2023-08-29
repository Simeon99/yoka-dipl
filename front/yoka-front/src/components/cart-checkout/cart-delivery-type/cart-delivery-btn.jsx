import React, { useContext } from "react";
import { TranslationContext } from "../../../context/translation/TranslationContext";
import { useTranslation } from "react-i18next";
import { GrDeliver } from "react-icons/gr";

import "./cart-delivery-btn.scss";

export default function CartDeliveryBtn({
  updateDeliveryType,
  deliveryTipe,
  onClick,
  children,
}) {
  const { tr } = useContext(TranslationContext);
  const { t, i18n } = useTranslation(tr);


  return (
    <div
      onClick={onClick}
      className={` ${deliveryTipe ? "is-selected" : ""} order-delivery-wrapper`}
    >
      <div className="order-delivery">{children}</div>
    </div>
  );
}
