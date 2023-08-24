export const addItemToCart = (
  cartItems,
  cartItemToAdd,
  length,
  width,
  height,
  quantity,
  curentPrice,
  colourId
) => {
  const existingCartItem = cartItems.find((cartItem) => {
    console.log("AAAAAAAAAAA", cartItem, cartItemToAdd);
    return (
      cartItem.id === cartItemToAdd.id &&
      cartItem.length === length &&
      cartItem.width === width &&
      cartItem.height === height &&
      cartItem.colourId === colourId
    );
  });

  if (existingCartItem) {
    const cartItemsArr = cartItems.map((cartItem) => {
      if (
        cartItem.id === cartItemToAdd.id &&
        cartItem.length === length &&
        cartItem.width === width &&
        cartItem.height === height &&
        cartItem.colourId === colourId
      ) {
        return {
          ...cartItem,
          length: length,
          width: width,
          height: height,
          quantity: cartItem.quantity + quantity,
          price: curentPrice,
          colourId: colourId,
        };
      } else return cartItem;
    });
    localStorage.setItem("cart", JSON.stringify(cartItemsArr));
    return cartItemsArr;
  }

  const cartArr = [
    ...cartItems,
    {
      ...cartItemToAdd,
      length: length,
      width: width,
      height: height,
      quantity: quantity,
      price: curentPrice,
      colourId: colourId,
    },
  ];
  localStorage.setItem("cart", JSON.stringify(cartArr));
  return cartArr;
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.id === cartItemToRemove.id &&
      cartItemToRemove.length === cartItem.length &&
      cartItemToRemove.width === cartItem.width &&
      cartItemToRemove.height === cartItem.height &&
      cartItemToRemove.colourId === cartItem.colourId 
  );

  if (existingCartItem.quantity === 1) {
    const cartItemsArr = cartItems.filter(
      (cartItem) =>
        cartItem.id !== cartItemToRemove.id ||
        cartItemToRemove.length !== cartItem.length ||
        cartItemToRemove.width !== cartItem.width ||
        cartItemToRemove.height !== cartItem.height ||
      cartItemToRemove.colourId !== cartItem.colourId 
    );

    localStorage.setItem("cart", JSON.stringify(cartItemsArr));

    return cartItemsArr;
  }

  const cartItemsArr = cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id &&
    cartItemToRemove.length === cartItem.length &&
    cartItemToRemove.width === cartItem.width &&
    cartItemToRemove.height === cartItem.height
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
  localStorage.setItem("cart", JSON.stringify(cartItemsArr));

  return cartItemsArr;
};

export const filterItemFromCart = (cartItems, item) => {
  const cartItemsArr = cartItems.filter((cartItem) => {
    console.log("CCC", item.colourId, cartItem.colourId);
    return (
      cartItem.id !== item.id ||
      item.length !== cartItem.length ||
      item.width !== cartItem.width ||
      item.height !== cartItem.height ||
      item.colourId !== cartItem.colourId
    );
  });
  localStorage.setItem("cart", JSON.stringify(cartItemsArr));

  return cartItemsArr;
};

export const getCartItemsCount = (cartItems) =>
  cartItems.reduce(
    (accumalateQuantity, cartItem) => accumalateQuantity + cartItem.quantity,
    0
  );
