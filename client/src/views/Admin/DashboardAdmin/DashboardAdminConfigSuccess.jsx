import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const DashboardAdminConfigSuccess = ({ location }) => {
  //declarar location aqui se puede ?

  useEffect(() => {
    // Extraer el código de autorización de la URL
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    console.log("aqui es un log actualizado", code);
    // Intercambiar el código de autorización por un token de acceso
    exchangeAuthorizationCodeForToken(code);
  }, [location.search]);

  const exchangeAuthorizationCodeForToken = async (code) => {  
    axios
      .post("http://localhost:3000/mercadopago-authorization/success",{code})
      .then((response) => {
        const {data} = response
        console.log("respuesta del back: ", data);
      })
      .catch((error) => {
        console.error("Error:", error.request);
      });
  };

  return (
    <div>
      <h1>¡Autorización exitosa!</h1>
    </div>
  );
};

export default DashboardAdminConfigSuccess;

