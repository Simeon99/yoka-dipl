import React from "react";

import "./footer-styles.scss";
import { useTranslation } from "react-i18next";

const FooterContact = () => {
  
  const { t } = useTranslation();

  return (
  <div className="footer-contact">
    <div className="contact-item">
      <span> {t("app.footer.contactUs")}</span>
    </div>
    <div className="contact-item">
      <span>{t("app.footer.openingHours")} (GMT+1)</span>
      <br />
      <span>{t("app.footer.mToFri")} 10-18</span>
      <br />
      <span>{t("app.footer.holidays")} 12-16</span>
    </div>
    <div className="contact-item">
      <span>{t("app.footer.phone")}</span>
      <br />
      <a href="tel:+381 64 288 17 38">+381 64 288 17 38</a>
      <br />
      <a href="tel:+381 64 111 06 01">+381 64 111 06 01</a>
    </div>
    <div className="contact-item">
      <span>Email</span>
      <br />
      <a href="mailto:designyoka@gmail.com">designyoka@gmail.com</a>
    </div>
    <div className="powered-item">
      <span>{t("app.footer.poweredBy")}</span>
      <br />
      <span>Simeon Ilić</span>
      <br />
      <a href="mailto:simeonilic9@gmail.com">simeonilic9@gmail.com</a>
      <br />
      <a href="https://www.linkedin.com/in/simeon-ili%C4%87-1369341b8/">
        <img style={{width:25}} src="/img/home-page/in.png" alt="" />
      </a>
    </div>
  </div>
)};
export default FooterContact;
