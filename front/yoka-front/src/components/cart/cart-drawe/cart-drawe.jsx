import React, { useContext } from "react";

import Drawer from "react-modern-drawer";

import "./cart-drawe.scss";
import "react-modern-drawer/dist/index.css";
import { GrClose } from "react-icons/gr";
import CartIcont from "../cart-icon/cart-icon";
import { CartContext } from "../../../providers/cart.provider";
import CartArticle from "../cart-article/cart-article";
import CustomButton from "../../custom-button/custom-button.component";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import CartEmpty from "../cart-empty/cart-empty";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TranslationContext } from "../../../context/translation/TranslationContext";
import { useTranslation } from "react-i18next";

const CartDrawer = () => {
  const tr = useContext(TranslationContext);
  const { hidden } = useContext(CartContext);
  const { toggleHidden, cartItems } = useContext(CartContext);

  const [totalPrice, setTotalprice] = useState(0);
  const [showEmpty, setShowEmpty] = useState(true);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate("/shoppingcart");
    toggleHidden();
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      setTimeout(() => {
        setShowEmpty(false);
      }, 1000);
    } else setShowEmpty(true);
  }, [cartItems.length]);

  useEffect(() => {
    setTotalprice(
      cartItems.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.quantity * currentItem.price,
        0
      )
    );
  }, [cartItems]);

  return (
    <div className="cart-drawer-wrapper">
      <CartIcont />
      <Drawer
        open={!hidden}
        onClose={toggleHidden}
        direction="right"
        size={500}
        className="drawer"
      >
        <div className="drawer-wrapper">
          <div className="cart-top">
            <div className="header-drawer">
              <h1>{t("cartDrawe.tittle")}</h1>
              <GrClose onClick={toggleHidden} className="close" />
            </div>
            <div class="divider"></div>
            {showEmpty ? (
              <div className="list-wrapper">
                <TransitionGroup component="ul" className="list">
                  {cartItems.map((item, index) => (
                    <CSSTransition
                      key={`${item.id}-${item.colourId}-${item.width}-${item.length}-${item.height}`}
                      timeout={700}
                      classNames="item"
                    >
                      <CartArticle key={index} cartItem={item} />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </div>
            ) : (
              <CartEmpty />
            )}
          </div>
          {cartItems.length ? (
            <div className="cart-bottom">
              <div className="button-order">
                <CustomButton
                  onClick={(e) => handleClick(e)}
                  style={{ width: "100%" }}
                >
                  Order - {totalPrice} &euro;
                </CustomButton>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
