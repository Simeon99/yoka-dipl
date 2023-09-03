import React, { useState } from "react";

import Modal from "react-modal";

import { GrClose } from "react-icons/gr";

import { useTranslation } from "react-i18next";
import Input from "../../input/input";
import CustomButton from "../../custom-button/custom-button.component";

import "./adress-modal.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../../context/user/UserContext";
import { BarLoader } from "react-spinners";

export default function AdressModal({
  modalIsOpen,
  afterOpenModal,
  closeModal,
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const { t } = useTranslation();

  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    adress: "",
    city: "",
    country: "",
    touched: {
      adress: false,
      city: false,
      country: false,
    },
    inValid: {
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

  // const headers = {
  //   "Authorization": `Bearer ${user.accessToken}`
  // };


  const createAddress = () => {
    const data = {
      street: formState.adress,
      city: formState.city,
      country: formState.country,
    };

    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/address`, data, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((response) => {
        const responseAddress = response.data;

        console.log("BABABABA", responseAddress);
        toast.success("AAAAAAAAAAAAAA");
        closeModal();
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(t("account.addressError"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    createAddress();
    console.log(formState.adress, formState.city, formState.country);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <BarLoader
        height={5}
        className="bar-loader"
        color="black"
        loading={loading}
        cssOverride={{
          width: "100%",
          position: "absolute",
          top: "0px",
          left: "0",
        }}
        speedMultiplier={1.5}
      />
      <h2>Hello</h2>
      <div className="close-icon">
        <GrClose onClick={closeModal} />
      </div>

      <form onSubmit={handleSubmit}>
        <div class="row">
          <Input
            col="col-md-12"
            forLable="adress"
            label={t("cart.form.adress")}
            type="text"
            className="form-control"
            value={formState.adress}
            handleChange={handleInputChange}
            placeholder={t("cart.form.adress")}
            isInValid={formState.touched.adress && formState.inValid.adress}
          />
          <Input
            col="col-md-12"
            forLable="city"
            label={t("cart.form.city")}
            type="text"
            className="form-control"
            value={formState.city}
            handleChange={handleInputChange}
            placeholder={t("cart.form.city")}
            isInValid={formState.touched.city && formState.inValid.city}
          />
        </div>
        <Input
          forLable="country"
          label={t("cart.form.country")}
          type="text"
          className="form-control"
          value={formState.country}
          handleChange={handleInputChange}
          placeholder={t("cart.form.country")}
          isInValid={formState.touched.country && formState.inValid.country}
        />

        <div
          class={`button-wrapper ${
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
              formState.inValid.adress ||
              formState.inValid.city ||
              formState.inValid.country
            }
          >
            {t("cart.form.submit")}
          </CustomButton>
        </div>
      </form>
    </Modal>
  );
}
