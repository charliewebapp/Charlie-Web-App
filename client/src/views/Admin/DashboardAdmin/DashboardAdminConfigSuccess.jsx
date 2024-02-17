import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        `http://localhost:3001/mercadopago-authorization/success`,
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
    <div>
      <h1>Su cuenta ha sido conectada correctamente!</h1>
      <h2>¡Gracias por confiar en Charlie!</h2>
      <button onClick={backHome}>Finalizar Conexión</button>
    </div>
  );
}
