import React, { useState, useEffect, useContext } from "react";
import { BsPaintBucket } from "react-icons/bs";
import { TfiRulerAlt } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import axios from "axios";

import "./article-spec.scss";

import CustomButton from "../../custom-button/custom-button.component";
import { TranslationContext } from "../../../context/translation/TranslationContext";
import { CartContext } from "../../../providers/cart.provider";

const ArticleSpecification = ({ article }) => {
  const [colours, setColours] = useState();
  const [dimensions, setDimeonsions] = useState();

  const { addItem } = useContext(CartContext);

  const { toggleHidden } = useContext(CartContext);

  const tr = useContext(TranslationContext);

  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": tr.t,
  };

  const { t } = useTranslation();
  
  const [curentColourNum, setCurentColourNum] = useState(0);
  const [curentColour, setCurentColour] = useState();

  const [curentLengthNum, setCurentLenNum] = useState(0);
  const [curentLength, setCurentLen] = useState();

  const [curentWidthNum, setCurentWidNum] = useState(0);
  const [curentWidth, setCurentWid] = useState();

  const [curentHeightNum, setCurentHeightNum] = useState(0);
  const [curentHeight, setCurentHeight] = useState();

  const [curentPrice, setCurentPrice] = useState();

  const [curentQuant, setCurentQuant] = useState(1);

  const setCurent = (c, i) => {
    setCurentColourNum(i);
    setCurentColour(c.name);
  };

  const onSetLength = (l, i) => {
    setCurentLenNum(i);
    setCurentLen(l);
  };

  const onSetWidth = (w, i) => {
    setCurentWidNum(i);
    setCurentWid(w);
  };

  const onSetHeight = (h, i) => {
    setCurentHeightNum(i);
    setCurentHeight(h);
  };

  const fetchData = () => {
    const coloursFetch = axios.get(
      `${process.env.REACT_APP_API_URL}/api/articles/${article.id}/colours`,
      { headers }
    );
    const dimensionsFetch = axios.get(
      `${process.env.REACT_APP_API_URL}/api/articles/${article.id}/dimensions`,
      { headers }
    );

    axios
      .all([coloursFetch, dimensionsFetch])
      .then(
        axios.spread((colourRes, dimensionRes) => {
          setColours(colourRes.data);
          setDimeonsions(dimensionRes.data);
          setCurentWid(dimensionRes.data.widths[0]);
          setCurentHeight(dimensionRes.data.heights[0]);
          setCurentLen(dimensionRes.data.lengths[0]);
          setCurentColour(colourRes.data[0].name);
          setCurentColourNum(0)
          
        })
      )
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {});
  };

  const fetchPrice = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/articlePrice/price/article/${article.id}/dimensions/${curentWidth}/${curentHeight}/${curentLength}`
      )
      .then((response) => {
        console.log(response.data);
        setCurentPrice(response.data.price);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [article.id, tr]);

  useEffect(() => {
    console.log("Test",article.id, curentWidth, curentHeight, curentLength)
    fetchPrice();
  }, [curentWidth, curentHeight, curentLength]);

  return (
    <div className="article-spec">
      <h2 className="show-name-spec">{article.name}</h2>
      <div className="img-wrapper">
        <img src="/img/home-page/testimg.jpg" alt="Image test"></img>
      </div>

      <div className="pick-finish-wrapper">
        <div className="title-wrapper">
          <div className="tittle">
            <BsPaintBucket size={28} />
            <span>
              {t("app.article.spec.dimensions")}
              {">"}
            </span>
          </div>
          <div className="picked-color">
            {curentColour}
            {/* {colours && colours[0].name} */}
            {article?.colors?.forEach((e) => {
              return <span>{e.color}</span>;
            })}
          </div>
        </div>
        <div className="color-picker">
          {colours &&
            colours.map((c, i) => {
              return (
                <div
                  key={i}
                  onClick={(e) => setCurent(c, i)}
                  className={
                    "background-image " +
                    (curentColourNum === i ? "color-selected" : "")
                  }
                  style={{
                    backgroundImage: `url(${c.mediaLink})`,
                  }}
                />
              );
            })}
        </div>
      </div>
      <div className="pisk-dimension">
        <div className="title-wrapper">
          <div className="tittle">
            <TfiRulerAlt size={28} />
            <span>
              {t("app.article.spec.dimensions")}
              {">"}
            </span>
          </div>
          <div className="picked-dimension">
            {curentLength}/{curentWidth}/{curentHeight} cm
          </div>
        </div>
        <div className="dimension-picker">
          <div className="length-wrapper">
            <span>{t("app.article.spec.length")}</span>
            <div className="dimensions">
              {dimensions?.lengths &&
                dimensions?.lengths.map((l, i) => {
                  return (
                    <span
                      key={i}
                      onClick={(e) => onSetLength(l, i)}
                      className={curentLengthNum === i ? "len-selected" : ""}
                    >
                      {l}
                    </span>
                  );
                })}
            </div>
          </div>
          <div className="width-wrapper">
            <span className="width">{t("app.article.spec.width")}</span>
            <div className="dimensions">
              {dimensions?.widths &&
                dimensions.widths.map((w, i) => {
                  return (
                    <span
                      key={i}
                      onClick={(e) => onSetWidth(w, i)}
                      className={curentWidthNum === i ? "wid-selected" : ""}
                    >
                      {w}
                    </span>
                  );
                })}
            </div>
          </div>
          <div className="height-wrapper">
            <span>{t("app.article.spec.height")}</span>
            <div className="dimensions">
              {dimensions?.heights &&
                dimensions?.heights.map((h, i) => {
                  return (
                    <span
                      key={i}
                      onClick={(e) => onSetHeight(h, i)}
                      className={curentHeightNum === i ? "heig-selected" : ""}
                    >
                      {h}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="buttons-wrapper">
        <div className="plus-minus">
          <div
            className="button"
            onClick={() =>
              setCurentQuant(curentQuant > 1 ? curentQuant - 1 : 1)
            }
          >
            -
          </div>
          <div>{curentQuant}</div>
          <div
            className="button"
            onClick={() => setCurentQuant(curentQuant + 1)}
          >
            +
          </div>
        </div>
        <CustomButton
          onClick={() => {
            addItem(article, curentLength, curentWidth, curentHeight, curentQuant, curentPrice, colours[curentColourNum].id);
            toggleHidden();
          }}
        >
          <span>{t("app.article.spec.add_to_cart")}</span>
          <span> {curentPrice}€</span>
        </CustomButton>
      </div>
    </div>
  );
};
export default ArticleSpecification;
