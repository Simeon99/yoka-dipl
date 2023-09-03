import React from "react";

import "./user-orders.scss";
import { useTranslation } from "react-i18next";

export default function UserOrders() {
  const { t } = useTranslation();

  return (
    <div className="user-orders">
      <h1>{t("account.showOrders")}</h1>
    </div>
  );
}
