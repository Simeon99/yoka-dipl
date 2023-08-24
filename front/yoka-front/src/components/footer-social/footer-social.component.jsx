import React from "react";

import "./footer-styles.scss";

const FooterSocial = () => (
  <div className="footer-social">
    <span>Yoka Furniture</span>
    <span>
      It’s simple. We make furniture. We believe that the space that surrounds
      us has an enormous impact on us and shapes the way we perceive the world.
      That is precisely why we create beautiful and functional items which
      accompany you each day.
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

    <span>© 2022 Yoka Furniture. All Rights Reserved.</span>
  </div>
);
export default FooterSocial;
