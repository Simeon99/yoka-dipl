import React from "react";

import "./footer-styles.scss";
import { useTranslation } from "react-i18next";

const FooterSocial = () => {
  const { t } = useTranslation();
  
  return (
  <div className="footer-social">
    <span>Yoka Furniture</span>
    <span>
      {t("app.footer.text")}
    </span>
    <div className="social-icons-wrapper">
      <div className="social-icons">
        <a href="https://www.instagram.com/yoka_furniture/">
          <img src="/img/home-page/ig.png" alt="" />
        </a>
        <a href="https://www.facebook.com/yokafurniture">
          <img src="/img/home-page/fb.png" alt="" />
        </a>
        <a href="">
          <img src="/img/home-page/pt.png" alt="" />
        </a>
      </div>
    </div>

    <span>© 2022 {t("app.footer.rights")}</span>
  </div>
);}
export default FooterSocial;
