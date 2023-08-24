import React from "react";

import "./article-item.scss";

const ArticleItem = ({ article }) => {
  return (
    <div className="article-item">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${article.articleImages[0].mediaLink})`,
        }}
      />
      <div className="content">
        <p className="title">{article.name}</p>
        <div className="img-wrapper">
          <img
            alt="colour"
            src={article.colours[0] && article.colours[0].mediaLink}
          ></img>
          <span className="subtitle">
            {article.colours?.length > 1
              ? "+" + (article.colours?.length - 1)
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ArticleItem;
