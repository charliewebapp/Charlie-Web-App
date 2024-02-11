import React from "react";
import style from "./dashboardAdmin.module.css";

function DashboardAdminConfig() {
  return (
    <div className={style.container}>
      <h2 className={style.h2}>Configuración</h2>
      <div containerButton>
        <div className={style.linkContainer}>
          {/* Dentor del div poner el link to */}
          <button className={style.buttonConfig}> Conectar MercadoPago</button>
        </div>
        <br />
        <div className={style.linkContainer}>
          {/* Dentor del div poner el link to */}
          <button className={style.buttonConfig}> Cambiar contraseña </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdminConfig;
