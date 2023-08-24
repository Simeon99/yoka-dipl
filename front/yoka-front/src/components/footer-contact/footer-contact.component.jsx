import React from "react";

import "./footer-styles.scss";

const FooterContact = () => (
  <div className="footer-contact">
    <div className="contact-item">
      <span>Contact Us</span>
    </div>
    <div className="contact-item">
      <span>Opening hours (GMT+1)</span>
      <br />
      <span>Monday - Friday: 10-18</span>
      <br />
      <span>Saturday, Sundays and holidays: 12-16</span>
    </div>
    <div className="contact-item">
      <span>Phone</span>
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
      <span>Powered by:</span>
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
);
export default FooterContact;
