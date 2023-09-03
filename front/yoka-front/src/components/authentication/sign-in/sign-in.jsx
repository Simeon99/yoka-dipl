import React, { useState  } from "react";

import Input from "../../input/input";
import BarLoader from "react-spinners/BarLoader";

import CustomButton from "../../custom-button/custom-button.component";

import "./sign-in.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../context/user/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


export default function SignIn() {
  const { t } = useTranslation();

  const { user, setUser } = useContext(UserContext);
  const [badCredentials, setBadCredentials] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const [formState, setFormState] = useState({
    usernameOrEmail: "",
    password: "",
    touched: {
      usernameOrEmail: false,
      password: false,
    },
    inValid: {
      usernameOrEmail: true,
      password: true,
    },
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
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

  const login = (e) => {
    e.preventDefault();

    const data = {
      usernameOrEmail: formState.usernameOrEmail,
      password: formState.password,
    };

    console.log(data);

    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, data)
      .then((response) => {
        const userData = response.data;

        setUser(userData);
        window.localStorage.setItem("user", JSON.stringify(userData));
        console.log("BABABABA", userData);
        navigate(`/`);
        toast.success(t("authentication.successLogin"));
      })
      .catch((error) => {
        setBadCredentials(true);

      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="signi-in-wrapper">
      <form onSubmit={login}>
        <div class="row">
          <Input
            col="col-md-12"
            forLable="usernameOrEmail"
            label={t("authentication.usernameOrEmail")}
            type="text"
            error={badCredentials}
            className="form-control"
            value={formState.usernameOrEmail}
            handleChange={handleInputChange}
            placeholder={t("authentication.usernameOrEmail")}
            isInValid={
              formState.touched.usernameOrEmail &&
              formState.inValid.usernameOrEmail
            }
          />
          <Input
            col="col-md-12"
            forLable="password"
            label={t("authentication.password")}
            type="password"
            error={badCredentials}
            className="form-control"
            value={formState.password}
            handleChange={handleInputChange}
            placeholder={t("authentication.password")}
            isInValid={formState.touched.password && formState.inValid.password}
          />
        </div>
        {badCredentials ? (
          <div class="alert alert-danger" role="alert">
            {t("authentication.error")}
          </div>
        ) : (
          ""
        )}

        <div
          class={`button-wrapper ${
            formState.inValid.usernameOrEmail || formState.inValid.password
              ? "not-alowed"
              : ""
          }`}
          style={
            formState.inValid.usernameOrEmail || formState.inValid.password
              ? { cursor: "not-allowed" }
              : { cursor: "pointer" }
          }
        >
          <CustomButton
            type="submit"
            unclickable={
              formState.inValid.usernameOrEmail || formState.inValid.password
            }
          >
            {t("cart.form.submit")}
          </CustomButton>
          
        </div>
        <hr />
        <CustomButton
            type="button"
            onClick={() => {navigate(`/authentication/register`);}}
            isWhite={true}
          >
            {t("authentication.createAccount")}
          </CustomButton>
      </form>
      <BarLoader
        height={5}
        className="bar-loader"
        color="black"
        loading={loading}
        cssOverride={{
          width: "100%",
          marginTop:"5px"
        }}
        speedMultiplier={1.5}
      />
    </div>
  );
}
