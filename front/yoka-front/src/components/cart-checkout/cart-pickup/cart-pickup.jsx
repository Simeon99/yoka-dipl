import React, { useContext, useState } from "react";
import CustomButton from "../../custom-button/custom-button.component";
import Input from "../../input/input";
import { TranslationContext } from "../../../context/translation/TranslationContext";
import { useTranslation } from "react-i18next";
import { CartContext } from "../../../providers/cart.provider";

import "./cart-pickup.scss";

export default function CartPickUp() {
  const tr = useContext(TranslationContext);
  const { t } = useTranslation();

  const { cartItems } = useContext(CartContext);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
    },
    inValid: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
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
    console.log(
      formState.firstName,
      formState.lastName,
      formState.email,
      formState.phone
    );
    console.log(cartItems);
  }

  return (
    <div className="cart-pick-up">
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
        >
          <CustomButton
            type="submit"
            st
            unclickable={
              formState.inValid.firstName ||
              formState.inValid.lastName ||
              formState.inValid.email ||
              formState.inValid.phone
            }
          >
            {t("cart.form.submit")}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
