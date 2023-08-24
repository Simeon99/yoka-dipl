import React, { createContext, useState, useEffect } from "react";

import {
  addItemToCart,
  filterItemFromCart,
  removeItemFromCart,
  getCartItemsCount,
} from "./cart.utils";

const localStorageCart = localStorage.getItem("cart");

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState(
    localStorageCart ? JSON.parse(localStorageCart) : []
  );
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));
  const addItem = (item, length, width, height, quantity, curentPrice, colourid) =>
    setCartItems(
      addItemToCart(cartItems, item, length, width, height, quantity, curentPrice, colourid)
    );
  const toggleHidden = () => setHidden(!hidden);
  const clearItemFromCart = (item) =>
    setCartItems(filterItemFromCart(cartItems, item));

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        cartItemsCount,
        clearItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
