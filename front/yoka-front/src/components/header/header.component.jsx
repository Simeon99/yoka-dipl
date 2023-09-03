import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";

import { IoSearchSharp } from "react-icons/io5";

import "./header.styles.scss";
import { Container, Nav, Navbar } from "react-bootstrap";
import DropDown from "../drow-down/dorp-down.component";
import CustomHamvurger from "../hamburger/hamburger.component";
import { TranslationContext } from "../../context/translation/TranslationContext";
import { CartContext } from "../../providers/cart.provider";
import CartDrawer from "../cart/cart-drawe/cart-drawe";
import { UserContext } from "../../context/user/UserContext";
import { toast } from "react-hot-toast";
import HeaderUser from "../user/header-user/header-user";

const Header = () => {
  const { t, i18n } = useTranslation();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tr = useContext(TranslationContext);

  const { setTranslation } = useContext(TranslationContext);

  const [furnitureCattegories, setFurnitureCattegories] = useState([]);

  const { user, setUser } = useContext(UserContext);

  const [curentLang, setCurentLang] = useState(
    window.localStorage.getItem("t")
      ? JSON.parse(window.localStorage.getItem("t"))
      : "sr"
  );
  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": curentLang,
  };

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categories`, { headers })
      .then((response) => {
        setFurnitureCattegories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    setUser(null);
    window.localStorage.removeItem("user");
    toast.success(t("authentication.logOutMessage"));
    navigate("/");
  };

  useEffect(() => {
    console.log(tr.t);
    fetchData();
  }, [tr]);

  const changeLanguage = (e) => {
    setCurentLang(e.target.value);
    setTranslation(e.target.value);
    window.localStorage.setItem("t", JSON.stringify(e.target.value));
    i18n.changeLanguage(e.target.value);
  };

  const furnitureItems = [
    { key: 1, name: t("app.header.furnitureItems.0") },
    { key: 2, name: t("app.header.furnitureItems.1") },
    { key: 3, name: t("app.header.furnitureItems.2") },
    { key: 4, name: t("app.header.furnitureItems.3") },
    { key: 5, name: t("app.header.furnitureItems.4") },
    { key: 6, name: t("app.header.furnitureItems.5") },
  ];
  const aboutUsItems = [
    { key: 1, name: t("app.header.aboutUsItems.0") },
    { key: 2, name: t("app.header.aboutUsItems.1") },
    { key: 3, name: t("app.header.aboutUsItems.2") },
    { key: 4, name: t("app.header.aboutUsItems.3") },
    { key: 5, name: t("app.header.aboutUsItems.4") },
    { key: 6, name: t("app.header.aboutUsItems.5") },
    { key: 7, name: t("app.header.aboutUsItems.6") },
  ];
  if (
    pathname === "/authentication/signin" ||
    pathname === "/authentication/register"
  )
    return <></>;

  return (
    <div className="header-container">
      <Navbar expand="lg" className="header">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img
                src={`${process.env.REACT_APP_API_URL}/download/ZMA6SoxU-1685475573141.jpg`}
                alt="YOKA"
                className="background-image"
              />
            </Link>
          </Navbar.Brand>

          <Nav className="ml-auto d-none d-lg-flex">
            <div className="nav-link">
              <DropDown
                title={t("app.header.furniture")}
                items={furnitureCattegories}
              />
            </div>
            <div className="nav-link">
              <Link className="option" to={"/"}>
                {t("app.header.kitchen")}
              </Link>
            </div>
            <div className="nav-link">
              <DropDown title={t("app.header.aboutAs")} items={aboutUsItems} />
            </div>
            <div className="nav-link">
              <Link className="option" to={"/"}>
                Press
              </Link>
            </div>
          </Nav>
          <div className="options-two">
            {user ? (
              <HeaderUser user={user} logOut={logOut}/>
            ) : (
              <Link className="option" to={"/authentication/signin"}>
                <MdAccountCircle className="account" size={30} />
              </Link>
            )}

            <button
              type="button"
              className={
                "btn btn-link " + (curentLang === "en" ? "selected" : "")
              }
              onClick={changeLanguage}
              value={"en"}
            >
              EN
            </button>
            <button
              type="button"
              className={
                "btn btn-link " + (curentLang === "sr" ? "selected" : "")
              }
              onClick={changeLanguage}
              value={"sr"}
            >
              SR
            </button>
            <IoSearchSharp className="search-icn" />

            <CartDrawer />
          </div>
          <CustomHamvurger items={furnitureCattegories} />
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
