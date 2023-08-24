import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ArticleCarousel from "../../components/show-article/article-carousel/article-carousel";
import ArticleDetails from "../../components/show-article/article-details/article-details";
import ArticleSpecification from "../../components/show-article/article-specification/article-spec";

import WithScrollbar from "../../components/carousel/carousel.component";
import "./article-page.scss";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { TranslationContext } from "../../context/translation/TranslationContext";

const imagesInstagram = [
  { url: "/img/home-page/sugg-sboard.png", route: "/sugg-sboard" },
  { url: "/img/home-page/sugg-kitcT.png", route: "/sugg-kitcT" },
  { url: "/img/home-page/sugg-rib-sb1.png", route: "/sugg-rib-sb1" },
  { url: "/img/home-page/sugg-rib-sb1.png", route: "/sugg-rib-sb1" },
  { url: "/img/home-page/sugg-rib-sb1.png", route: "/sugg-rib-sb1" },
  { url: "/img/home-page/sugg-rib-sb1.png", route: "/sugg-rib-sb1" },
];

const ArcticlePage = () => {
  const [article, setArticle] = useState({});

  const { id } = useParams();

  const tr = useContext(TranslationContext);
  const { t } = useTranslation();

  const localBuisnisSupport ="We value and support local businesses, maintaininglong-term relationships with them. Thanks to shortrangesupply, we significantly shorten lead-times.";

  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": tr.t,
  };

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/articles/${id}`, {headers})
      .then((res) => {
        setArticle(res.data);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  useEffect(() => {
    fetchData();
  }, [id, tr]);

  return (
    <div className="article-page-wrapper">
      <div className="article-wrapper">
        <div className="article">
          <ArticleDetails article={article} localBuisnisSupport = {localBuisnisSupport} />
          <ArticleCarousel article={article} images={article.articleImages ? article.articleImages : []}/>
          <ArticleSpecification article={article} />
        </div>
      </div>
      <div className="carousel">
        <h2>{t("article.may_like")}</h2>
        <WithScrollbar images={imagesInstagram} />
      </div>
    </div>
  );
};

export default ArcticlePage;
