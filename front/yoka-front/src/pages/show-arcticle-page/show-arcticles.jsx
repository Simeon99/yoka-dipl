import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import ArticleItem from "../../components/article-item/article-item";

import "./show-arcticles.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { TranslationContext } from "../../context/translation/TranslationContext";

const ShowArcticles = () => {
  const tr = useContext(TranslationContext);
  const { t } = useTranslation();
  const { id } = useParams();

  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState(null);

  const [curentLang, setCurentLang] = useState("sr");

  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": tr.t,
  };

  const fetchData = () => {

    const articlesFetch = axios.get(`${process.env.REACT_APP_API_URL}/api/articles/category/${id}`,{headers});
    const categoryFetch = axios.get(`${process.env.REACT_APP_API_URL}/api/categories/${id}`,{headers})

    axios
    .all([articlesFetch, categoryFetch])
    .then(axios.spread((articleRes,categoryRes) => {
        setArticles(articleRes.data)
        setCategory(categoryRes.data)
    }))
    .catch(error => {
        console.error('Error:', error);
      });


  };

  useEffect(() => {
    fetchData();
  }, [id, tr]);

  return (
    <div className="show-arcticles">
      <h1>{category && category.name}</h1>

      <p>{t("sideboards.freeShipping")} 100 €</p>
      <div className="articles-wrapper">
        {articles &&
          articles.map((article, i) => {
            return (
              
                <div key={article.id} className="a-item">
                  <Link key={article.id} style={{ color: 'inherit', textDecoration: 'none' }} to={`/arcticle/${article.id}`}>
                  <ArticleItem
                    key={article.id}
                    imageUrl={article.articleImages[0].mediaLink}
                    article = {article}
                  />
                  </Link>
                </div>
            );
          })}
      </div>
    </div>
  );
};
export default ShowArcticles;
