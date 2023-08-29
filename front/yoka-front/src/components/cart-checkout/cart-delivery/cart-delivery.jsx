import React from "react";
import { useContext } from "react";
import { TranslationContext } from "../../../context/translation/TranslationContext";
import { useTranslation } from "react-i18next";
import CustomButton from "../../custom-button/custom-button.component";
import Input from "../../input/input";
import { useState } from "react";
import { CartContext } from "../../../providers/cart.provider";

import "./cart-delivery.scss";

export default function CartDelivery() {
  const tr = useContext(TranslationContext);
  const { t } = useTranslation();

  const { cartItems } = useContext(CartContext);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    adress: "",
    city: "",
    country: "",
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
      adress: false,
      city: false,
      country: false,
    },
    inValid: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      adress: true,
      city: true,
      country: true,
    },
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log("AAA", id, "CC", value);
    if (value < 1) {
      setFormState((prevState) => ({
        ...prevState,
        [id]: value,
        touched: {
          ...prevState.touched,
          [id]: true,
        },
        inValid: {
          ...prevState.inValid,
          [id]: true,
        },
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [id]: value,
        touched: {
          ...prevState.touched,
          [id]: true,
        },
        inValid: {
          ...prevState.inValid,
          [id]: false,
        },
      }));
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (
      formState.inValid.firstName ||
      formState.inValid.lastName ||
      formState.inValid.email ||
      formState.inValid.phone ||
      formState.inValid.adress ||
      formState.inValid.city ||
      formState.inValid.country
    )
      console.log(
        formState.firstName,
        formState.lastName,
        formState.email,
        formState.phone,
        formState.adress,
        formState.city,
        formState.country
      );
    console.log(cartItems);
  }

  return (
    <div className="cart-delivery">
      <form onSubmit={handleSubmit}>
        <div class="row">
          <Input
            col="col-md-6"
            forLable="firstName"
            label={t("cart.form.firstName")}
            type="text"
            className="form-control"
            value={formState.firstName}
            handleChange={handleInputChange}
            placeholder={t("cart.form.firstName")}
            isInValid={
              formState.touched.firstName && formState.inValid.firstName
            }
          />
          <Input
            col="col-md-6"
            forLable="lastName"
            label={t("cart.form.lastName")}
            type="text"
            className="form-control"
            value={formState.lastName}
            handleChange={handleInputChange}
            placeholder={t("cart.form.lastName")}
            isInValid={formState.touched.lastName && formState.inValid.lastName}
          />
        </div>
        <Input
          forLable="email"
          label={t("cart.form.email")}
          type="email"
          className="form-control"
          value={formState.email}
          handleChange={handleInputChange}
          placeholder={t("cart.form.email")}
          isInValid={formState.touched.email && formState.inValid.email}
        />
        <Input
          forLable="phone"
          label={t("cart.form.phone")}
          type="text"
          className="form-control"
          value={formState.phone}
          handleChange={handleInputChange}
          placeholder={"+381 ** *** ****"}
          isInValid={formState.touched.phone && formState.inValid.phone}
        />
        <Input
          forLable="adress"
          label={t("cart.form.adress")}
          type="text"
          className="form-control"
          value={formState.adress}
          handleChange={handleInputChange}
          placeholder={t("cart.form.adress")}
          isInValid={formState.touched.adress && formState.inValid.adress}
        />
        <div class="row">
          <Input
            col="col-md-6"
            forLable="city"
            label={t("cart.form.city")}
            type="text"
            className="form-control"
            value={formState.city}
            handleChange={handleInputChange}
            placeholder={t("cart.form.city")}
            isInValid={formState.touched.city && formState.inValid.city}
          />

          <div class="form-group col-md-6">
            <label for="country">{t("cart.form.country")}</label>
            <select
              id="country"
              class={`form-control ${
                formState.touched.country && formState.inValid.country
                  ? "is-invalid"
                  : ""
              }`}
              value={formState.country}
              onChange={handleInputChange}
              required
            >
              <option hidden selected value>
                {t("cart.form.select")}
              </option>
              <option>{t("cart.form.serbia")}</option>
              <option>{t("cart.form.croatia")}</option>
              <option>{t("cart.form.slovenia")}</option>
            </select>
            <div class="invalid-feedback">
              Example invalid custom select feedback
            </div>
          </div>
        </div>
        <div
          class={`button-wrapper ${
            formState.inValid.firstName ||
            formState.inValid.lastName ||
            formState.inValid.email ||
            formState.inValid.phone ||
            formState.inValid.adress ||
            formState.inValid.city ||
            formState.inValid.country
              ? "not-alowed"
              : ""
          }`}
          // style={
          //   formState.inValid.firstName ||
          //   formState.inValid.lastName ||
          //   formState.inValid.email ||
          //   formState.inValid.phone ||
          //   formState.inValid.adress ||
          //   formState.inValid.city ||
          //   formState.inValid.country
          //     ? { cursor: "not-allowed" }
          //     : { cursor: "pointer" }
          // }
        >
          <CustomButton
            type="submit"
            unclickable={
              formState.inValid.firstName ||
              formState.inValid.lastName ||
              formState.inValid.email ||
              formState.inValid.phone ||
              formState.inValid.adress ||
              formState.inValid.city ||
              formState.inValid.country
            }
          >
            {t("cart.form.submit")}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
