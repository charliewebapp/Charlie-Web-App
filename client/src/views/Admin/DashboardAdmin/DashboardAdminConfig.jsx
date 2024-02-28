import React, { useEffect, useState } from "react";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
import FormUpdatePasswordAdmin from "../FormUpdatePasswordAdmin/FormUpdatePasswordAdmin";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import FormUpdateImage from "../FormUpdateImage/FormUpdateImage";
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
  const [existing, setExisting] = useState(false);

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
      console.log("funciona date finaliza");
    } catch (error) {
      console.log("error en date: ", error.message);
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
      const { data } = await axios.post(`${URL_API}/deleteAuth`, {
        clubName,
      });
      console.log(data);
      if (data) {
        window.alert("Se ha eliminado exitosamente");
      }
      existingConection();
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
      // console.log('data: ', data);
      if (data) {
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
    if (!dateTimeString) {
      return;
    }
    const dateTime = new Date(dateTimeString);
    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    return dateTime.toLocaleString(undefined, options);
  };

  const disableButton = (dateTimeString) => {
    if (!dateTimeString) {
      return setIsDisable(true);
    }
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
    const fetchData = async () => {
      await date();
      disableButton(dateTime);
      existingConection();
    };

    fetchData();
  }, []);
  const [activeButton, setActiveButton] = useState("container1");

  return (
    <div className={style.containerCONFIG}>
      <div className={style.condicionalBtnConfig}>
        <button onClick={() => setActiveButton("container1")}>
          CONFIGURAR PERFIL
        </button>
        <button onClick={() => setActiveButton("container2")}>
          CONFIGURAR MERCADO PAGO
        </button>
      </div>

      {activeButton === "container1" && (
        <div className={style.container2}>
          <FormUpdatePasswordAdmin />
          <FormUpdateImage />
        </div>
      )}
      {activeButton === "container2" && (
        <div className={style.container2}>
          <h2 className={style.h2}>Metodos de pago</h2>
          <div className={style.containerButton}>
            <button
              className={style.buttonConfig}
              onClick={authorization}
              disabled={existing}
            >
              {" "}
              Conectar Mercado Pago
            </button>
            {dateTime ? (
              <p className={style.pMP}>
                Su conexion a Mercado Pago caduca el {formatDateTime(dateTime)}{" "}
                a las {formatHourTime(dateTime)}
              </p>
            ) : (
              "Mercado Pago aún no fue conectado"
            )}
            {existing && (
              <button
                className={style.buttonConfig}
                onClick={updateMP}
                disabled={isDisable}
              >
                {" "}
                Actualizar Conexión a Mercado Pago
              </button>
            )}
            {existing && (
              <span className={style.pMP}>
                Este boton se habilitará 30 dias antes de caducar la conexion
              </span>
            )}
            {existing && (
              <button
                className={style.buttonConfigDelete}
                onClick={deleteConexion}
              >
                {" "}
                Eliminar Conexión a Mercado Pago
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardAdminConfig;
