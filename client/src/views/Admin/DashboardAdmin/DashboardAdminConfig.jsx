import React from "react";
import style from "./dashboardAdmin.module.css";
import FormUpdatePasswordAdmin from "../FormUpdatePasswordAdmin/FormUpdatePasswordAdmin";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function DashboardAdminConfig() {
  const { client } = useParams();
  const urlDeploy = 'https://mercadopago-7p1q.onrender.com'

  const authorization = () => {
    const clientId = import.meta.env.VITE_CLIENTID;
    localStorage.setItem("pathname", client);
    const redirectUri = `${urlDeploy}/${client}/mercadopago-authorization/success`;
    const state = uuidv4();
    const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;
    window.open(authorizationUrl);
  };

  return (
    <div className={style.container}>
      <h2 className={style.h2}>Configuración</h2>
      <div containerButton>
        <button className={style.buttonConfig} onClick={authorization}>
          {" "}
          Conectar MercadoPago
        </button>
      </div>
      <FormUpdatePasswordAdmin />
    </div>
  );
}

export default DashboardAdminConfig;
