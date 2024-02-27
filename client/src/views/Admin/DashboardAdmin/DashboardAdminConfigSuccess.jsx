import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";

const URL_API = import.meta.env.VITE_URL_API;

export default function DashboardAdminConfigSuccess({ location }) {
  const url_admin = import.meta.env.VITE_URL_ADMIN;
  const path = localStorage.getItem("pathname");
  const urlComeBack = `${url_admin}/admin/${path}/dashboardAdmin`;
  const [conection, setConection] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    exchangeAuthorizationCodeForToken(code);
  }, [location.search]);

  const exchangeAuthorizationCodeForToken = async (code) => {
    try {
      console.log("conection: ", conection);
      const { data } = await axios.post(
        `${URL_API}/mercadopago-authorization/success`,
        { code, path }
      );
      if (data) {
        setConection(true);
        console.log("conection: ", conection);
      }
      console.log("respuesta del back: ", data);
    } catch (error) {
      console.error("Error:", error.request);
    }
  };

  const backHome = () => {
    window.location.href = urlComeBack;
  };

  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <h1 className={style.h1}>DASHBOARD ADMINISTRADOR</h1>
      </div>

      {conection && ( //conexion exitosa
        <div className={style.dashboard}>
          <h2 className={style.h2}>
            Su cuenta ha sido conectada correctamente!
          </h2>
          <h3 className={style.h2}>¡Gracias por confiar en Charlie!</h3>
          <button onClick={backHome} className={style.btnCreate}>
            Finalizar Conexión
          </button>
        </div>
      )}
      {!conection && ( //conexion fallida
        <div className={style.dashboard}>
          <h2 className={style.h2}>
            Ha ocurrido un error al conectar mercadopago!
          </h2>
          <h3 className={style.h2}>¡Intente en un par de minutos nuevamente!</h3>
          <button onClick={backHome} className={style.btnCreate}>
            Volver al Home
          </button>
        </div>
      )}
    </div>
  );
}
