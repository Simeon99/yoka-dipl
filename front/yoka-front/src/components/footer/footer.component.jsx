import React from "react";
import FooterContact from "../footer-contact/footer-contact.component";
import FooterItems from "../footer-items/footer-items.component";
import FooterSocial from "../footer-social/footer-social.component";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./footer.styles.scss";
import { useLocation } from "react-router-dom";
const items1 = [
  "About the Brand",
  "Enthusiasm",
  "Production",
  "Sample sets",
  "Downloads",
];
const items2 = [
  "Terms of Use",
  "Return and replacment",
  "Delivery Information",
  "Ordering",
  "Privacy Policy",
];
const Footer = () => {
  const { pathname } = useLocation();
  if (pathname === "/authentication/signin" || pathname === "/authentication/login") return <></>;

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
