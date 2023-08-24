import React, { useContext } from "react";
import { FaShoppingBag } from "react-icons/fa";

import "./cart-icon.scss";
import {CartContext} from "../../../providers/cart.provider";

const CartIcont = () => {
  const { toggleHidden, cartItemsCount } = useContext(CartContext);

  return (
    <div>
      <div className="cart-icon-wrapper" onClick={toggleHidden}>
        {
          cartItemsCount > 0 ? <div className="item-num">{cartItemsCount}</div> : ""
        }
        
        <FaShoppingBag className="cart" />
      </div>
    </div>
  );
};

export default CartIcont;
