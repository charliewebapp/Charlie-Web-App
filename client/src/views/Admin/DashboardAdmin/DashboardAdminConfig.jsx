import React from "react";
import style from "./dashboardAdmin.module.css";
import FormUpdatePasswordAdmin from "../FormUpdatePasswordAdmin/FormUpdatePasswordAdmin";

function DashboardAdminConfig() {
  return (
    <div className={style.container}>
      <h2 className={style.h2}>Configuración</h2>
      <div className={style.containerButton}>
        {/* Dentro del div poner el link to */}
        <button className={style.buttonConfig}> Conectar MercadoPago</button>
      </div>
      <FormUpdatePasswordAdmin />
    </div>
  );
}

export default DashboardAdminConfig;
