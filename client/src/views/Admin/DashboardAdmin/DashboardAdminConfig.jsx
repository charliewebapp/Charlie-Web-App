import React from "react";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
import FormUpdatePasswordAdmin from "../FormUpdatePasswordAdmin/FormUpdatePasswordAdmin";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function DashboardAdminConfig() {
  const { clubName } = useParams();
  const urlDeploy = "https://admin-charlie.onrender.com/";
  const urlSuccess = `${urlDeploy}admin/dashboardAdmin/mercadopago-authorization/success`;

  const authorization = () => {
    console.log("iniciando autorizacion");
    const clientId = import.meta.env.VITE_CLIENTID;
    console.log(clubName);
    localStorage.setItem("pathname", clubName);
    const state = uuidv4();
    const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${urlSuccess}`;
    window.open(authorizationUrl);
  };

  return (
    <div className={style.containerMP}>
      <h2 className={style.h2}>Metodos de pago</h2>
      <div className={style.containerButton}>
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
