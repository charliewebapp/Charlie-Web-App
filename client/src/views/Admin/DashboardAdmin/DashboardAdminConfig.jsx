import React, { useEffect, useState } from "react";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
import FormUpdatePasswordAdmin from "../FormUpdatePasswordAdmin/FormUpdatePasswordAdmin";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const URL_API = import.meta.env.VITE_URL_API;
function DashboardAdminConfig() {
  const { clubName } = useParams();
  const URL_ADMIN = import.meta.env.VITE_URL_ADMIN;
  const urlSuccess = `${URL_ADMIN}/admin/dashboardAdmin/mercadopago-authorization/success`;
  const [expire, setExpire] = useState(0);
  const [dateTime, setDateTime] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const [existing, setExisting ] = useState(false);

  const authorization = () => {
    console.log("iniciando autorizacion");
    const clientId = import.meta.env.VITE_CLIENTID;
    localStorage.setItem("pathname", clubName);
    const state = uuidv4();
    const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${urlSuccess}`;
    window.open(authorizationUrl);
  };

  const date = async () => {
    try {
      const { data } = await axios.post(`${URL_API}/set-date-expire`, {
        clubName,
      });
      const expiresInSeconds = data.expires_in;
      const expiresInDays = expiresInSeconds / 86400;
      const dateTime = new Date(data.dateTime);
      const newDateTime = new Date(
        dateTime.getTime() + expiresInSeconds * 1000
      );

      setExpire(expiresInDays);
      setDateTime(newDateTime.toISOString());
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  const updateMP = async () => {
    try {
      const { data } = await axios.post(`${URL_API}/refresh-token`, {
        clubName,
      });
      if (data) {
        window.alert("conexion exitosa");
      }
    } catch (error) {
      window.alert("hubo un error");
      return res.status(500).json({ error: error.message });
    }
  };

  const deleteConexion = async () => {
    try {
      const { data } = await axios.delete(`${URL_API}/deleteAuth`, {
        clubName,
      });
      if (data) {
        window.alert("Se ha eliminado exitosamente");
      }
    } catch (error) {
      window.alert("no se pudo eliminar");
      return res.status(500).json({ error: error.message });
    }
  };


  const existingConection = async () => {
    try {
      const { data } = await axios.post(`${URL_API}/getAuth`, {
        clubName,
      });
      console.log(data);
      if(data){
        setExisting(true);
      }
    } catch {
      return res.status(500).json({ error: error.message });
    }
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return dateTime.toLocaleString(undefined, options);
  };
  const formatHourTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    return dateTime.toLocaleString(undefined, options);
  };

  const disableButton = (dateTimeString) => {
    const currentDate = new Date();
    const dateTime = new Date(dateTimeString);
    const differenceInDays =
      Math.abs(currentDate - dateTime) / (1000 * 60 * 60 * 24);

    if (differenceInDays < 30) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };

  useEffect(() => {
    date();
    disableButton(dateTime);
    existingConection()
  }, []);

  return (
    <div className={style.containerMP}>
      <h2 className={style.h2}>Metodos de pago</h2>
      <div className={style.containerButton}>
        <button className={style.buttonConfig} onClick={authorization}>
          {" "}
          Conectar Mercado Pago
        </button>
        <p>
          Su conexion a Mercado Pago caduca el {formatDateTime(dateTime)} a las{" "}
          {formatHourTime(dateTime)}
        </p>

        <button
          className={style.buttonConfig}
          onClick={updateMP}
          disabled={isDisable}
        >
          {" "}
          Actualizar Conexión a Mercado Pago
        </button>
        <span>
          Este boton se habilitará 30 dias antes de caducar la conexion
        </span>
       { existing && <button className={style.buttonConfig} onClick={deleteConexion}>
          {" "}
          Eliminar Conexión a Mercado Pago
        </button>}
      </div>
      <FormUpdatePasswordAdmin />
    </div>
  );
}

export default DashboardAdminConfig;
