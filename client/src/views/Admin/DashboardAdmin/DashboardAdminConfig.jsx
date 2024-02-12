import React from "react";
import style from "./dashboardAdmin.module.css";
import { v4 as uuidv4 } from "uuid";

function DashboardAdminConfig() {

  const authorization = () => {
    const redirectUri =
      "https://admin-charlie.onrender.com/admin/:clubName/dashboardAdmin/success";
    const clientId = "7378685924902197";
    const state = uuidv4();
    const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;
    window.open(authorizationUrl);
  };

  return (
    <div className={style.container}>
      <h2 className={style.h2}>Configuración</h2>
      <div containerButton>
        <div className={style.linkContainer}>
          {/* Dentro del div poner el link to */}
          <button className={style.buttonConfig} onClick={authorization}>Conectar MercadoPago</button>
        </div>
        <br />
        <div className={style.linkContainer}>
          {/* Dentro del div poner el link to */}
          <button className={style.buttonConfig}> Cambiar contraseña </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdminConfig;
