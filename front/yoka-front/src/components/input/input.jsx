import React from "react";

import "./input.scss";
import { useTranslation } from "react-i18next";

const Input = ({ handleChange, className, error, label, ...otherProps }) => {
  const { t } = useTranslation();
  return (
    <div class={`form-group ${otherProps.col ? otherProps.col : ""}`}>
      <label for={otherProps.forLable}>{label}</label>
      <input
        type={otherProps.type}
        className={`${className} ${otherProps.isInValid ? "is-invalid" : ""} `}
        id={otherProps.forLable}
        value={otherProps.value}
        onChange={(e) => handleChange(e)}
        placeholder={otherProps.placeholder}
      />
      <div class="invalid-feedback">
        {t("cart.form.error")}
      </div>
    </div>
  );
};

export default Input;
