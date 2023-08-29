import React from "react";

import "./cart-form.scss";
import CartPickUp from "../cart-pickup/cart-pickup";
import CartDelivery from "../cart-delivery/cart-delivery";

export default function CartForm({ deliveryTipe }) {
  return <div>{deliveryTipe ? <CartDelivery /> : <CartPickUp />}</div>;
}
