import React from "react";
import Heading from "../../components/heading/heading.component";

import 'bootstrap/dist/css/bootstrap.css';

import "./homepage.styles.scss";
import WithScrollbar from "../../components/carousel/carousel.component";

const images = [
  { url: "img/home-page/sugg-flat-sh.png", route: "/sugg-flat-sh" },
  { url: "img/home-page/sugg-oyster-kitc.png", route: "/sugg-oyster-kitc" },
  { url: "img/home-page/sugg-bark-sb.png", route: "/sugg-bark-sb" },
];

const imagesInstagram = [
  { url: "img/home-page/sugg-sboard.png", route: "/sugg-sboard" },
  { url: "img/home-page/sugg-kitcT.png", route: "/sugg-kitcT" },
  { url: "img/home-page/sugg-rib-sb1.png", route: "/sugg-rib-sb1" },
];

const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="heading-container">
        <Heading />
      </div>
      <div className="home-page">
        <div
          className="item-1"
          style={{ backgroundImage: "url(img/home-page/benefits.png)" }}
        ></div>
        <div className="item-2">
          <div className="header-scrollbar">
            <h2>This week's bestsellers</h2>
          </div>
          <WithScrollbar images={images} />
        </div>
        <div className="item-2">
          <div className="header-scrollbar">
            <h2>
              <a href="https://www.instagram.com/yoka_furniture/">
                @ yoka_furniture
              </a>{" "}
              on Instagram
            </h2>
          </div>
          <WithScrollbar images={imagesInstagram} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
