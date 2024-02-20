import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./DashboardAdminConfigSuccess.module.css"

const URL_API = import.meta.env.VITE_URL_API;

export default function DashboardAdminConfigSuccess({ location }) {
  const url_admin = import.meta.env.VITE_URL_ADMIN
  const path = localStorage.getItem("pathname");
  const urlComeBack = `${url_admin}/admin/${path}/dashboardAdmin`

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    exchangeAuthorizationCodeForToken(code);
  }, [location.search]);

  const exchangeAuthorizationCodeForToken = async (code) => {
    try {
      const { data } = await axios.post(
        `${URL_API}/mercadopago-authorization/success`,
        { code, path }
      );
      console.log("respuesta del back: ", data);
    } catch (error) {
      console.error("Error:", error.request);
    }
  };

  const backHome = () => {

    window.location.href = urlComeBack
  }

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <h1 className={styles.h1}>DASHBOARD ADMINISTRADOR</h1>
      </div>
      <h2 className={styles.h2}>Su cuenta ha sido conectada correctamente!</h2>
      <h3 className={styles.h2}>¡Gracias por confiar en Charlie!</h3>
      <button onClick={backHome} className={styles.button}>Finalizar Conexión</button>
    </div>
  );
}
