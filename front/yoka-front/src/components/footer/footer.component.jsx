import React from "react";
import FooterContact from "../footer-contact/footer-contact.component";
import FooterItems from "../footer-items/footer-items.component";
import FooterSocial from "../footer-social/footer-social.component";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./footer.styles.scss";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Footer = () => {

  const { t } = useTranslation()

  const items1 = [
    t("app.footer.aboutBrand"),
    t("app.footer.enthusiasm"),
    t("app.footer.production"),
    t("app.footer.sampleSets"),
  ];

  const items2 = [
    t("app.footer.termsOfUse"),
    t("app.footer.returnReplacment"),
    t("app.footer.delivery"),
    t("app.footer.ordering"),
    t("app.footer.privacyPolicy"),
  ];
  const { pathname } = useLocation();
  if (pathname === "/authentication/signin" || pathname === "/authentication/register") return <></>;

  return (
    <div className="footer">
      <Container>
        <Row>
          <Col xs={12} md={6} lg={3}>
            {" "}
            <FooterSocial />
          </Col>
          <Col xs={6} md={6} lg={3}>
            <FooterItems itemsList={items1} />
          </Col>
          <Col xs={6} md={6} lg={3}>
            <FooterItems itemsList={items2} />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <FooterContact />
          </Col>
        </Row>
      </Container>
      {/* <FooterSocial />
        <FooterItems itemsList={items1} />
        <FooterItems itemsList={items2} />
        <FooterContact /> */}
    </div>
  );
};

export default Footer;
