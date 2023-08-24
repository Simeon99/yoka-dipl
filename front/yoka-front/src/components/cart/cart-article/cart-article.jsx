import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { RiDeleteBin5Line } from "react-icons/ri";

import "./cart-article.scss";
import { CartContext } from "../../../providers/cart.provider";
import { CSSTransition } from "react-transition-group";
import { TranslationContext } from "../../../context/translation/TranslationContext";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect } from "react";

const CartArticle = ({ cartItem }) => {
  // const [curentQuant, setCurentQuant] = useState(1);

  const [article, setArticle] = useState();
  const [colour, setColour] = useState();

  const { addItem, removeItem, clearItemFromCart } = useContext(CartContext);

  const tr = useContext(TranslationContext);
  const { t } = useTranslation();
  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": tr.t,
  };

  const fetchData = () => {
    const coloursFetch = axios.get(
      `${process.env.REACT_APP_API_URL}/api/colours/${cartItem.colourId}`,
      { headers }
    );
    const articleFetch = axios.get(
      `${process.env.REACT_APP_API_URL}/api/articles/${cartItem.id}`,
      { headers }
    );
    axios
      .all([coloursFetch, articleFetch])
      .then(
        axios.spread((colourRes, articleRes) => {
          setColour(colourRes.data);
          setArticle(articleRes.data);
        })
      )
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchData();
  }, [cartItem, tr]);

  return (
    <div className="cart-article ">
      <div className="article-image">
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${cartItem.articleImages[0].mediaLink})`,
          }}
        />
        <div className="article-details">
          <Link className="link" to={"/arcticle/1"}>
            {/* <h2>{article.name}</h2> */}
            <h2>{article && article.name}</h2>
            <p>{colour?.name}</p>
          </Link>
          <p>
            {cartItem.width}/{cartItem.length}/{cartItem.height}
          </p>
          <span>{cartItem.price}€</span>
          <div className="plus-minus">
            <div className="button" onClick={() => removeItem(cartItem)}>
              -
            </div>
            <div>{cartItem.quantity}</div>
            <div
              className="button"
              onClick={() =>
                addItem(
                  cartItem,
                  cartItem.length,
                  cartItem.width,
                  cartItem.height,
                  1,
                  cartItem.price,
                  cartItem.colourId
                )
              }
            >
              +
            </div>
          </div>
        </div>
      </div>
      <div
        className="article-remove"
        onClick={() => clearItemFromCart(cartItem)}
      >
        <RiDeleteBin5Line />
      </div>
    </div>
  );
};

export default CartArticle;
