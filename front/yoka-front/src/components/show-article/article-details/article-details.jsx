import React, { useContext, useEffect, useState } from "react";
import "./article-details.scss";
import axios from "axios";
import { TranslationContext } from "../../../context/translation/TranslationContext";
import { useTranslation } from "react-i18next";

const ArticleDetails = ({ article, localBuisnisSupport }) => {
  const [description, setDescription] = useState();
  const tr = useContext(TranslationContext);
  const { t } = useTranslation();

  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": tr.t,
  };

  const fetchData = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/articles/${article.id}/descriptions`,
        { headers }
      )
      .then((response) => setDescription(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [article.id, tr]);

  return (
    <div className="article-details">
      <div className="article-description">
        <h2 className="show-name">{article?.name}</h2>

        <div>
          <span className="span-header">Product details</span>
        </div>
        <div>
          <span className="span-header">Materials</span>
          <br />
          {description &&
            description.map((d) => (
              <div>
                <span>{d.description}</span>
                <br />
              </div>
            ))}
        </div>
        <div>
          <span className="span-header">Local businesses support</span>
          <br />
          <span>{t("article.description.local_buisnesses_support")}</span>
        </div>
        <div>
          <span className="span-header">Delivery</span>
          <span>{t("article.description.delivery")}</span>
        </div>
        <div>
          <span className="span-header">Eco-friendly approach</span>
          <br />
          <span>{t("article.description.eco-friendly")}</span>
        </div>
      </div>
    </div>
  );
};
export default ArticleDetails;
