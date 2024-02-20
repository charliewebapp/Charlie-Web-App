import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router-dom";
import NavBarUser from "../NavBarUser/NavBarUser";
import styles from "./Profile.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

function Profile() {
  const { clubName } = useParams();
  const navigate = useNavigate();

  //log out de Auth0
  const { logout, isAuthenticated } = useAuth0();
  //redirecciona nuevamente a login -> no funciona
  // const handleLogout = () => {
  //     // Redirigir al usuario a la ruta dinámica después del cierre de sesión
  //     const returnTo = window.location.origin + `/${clubName}/login`;
  //     console.log(returnTo)
  //     logout({
  //         returnTo
  //     });
  // };

  const [history, setHistory] = useState([]);

  const myUser = JSON.parse(localStorage.getItem("myUser"));

  //   console.log("myUser de localStorage: ", myUser);

  const userId = "auth0|65cfa8efa259fd3e778d8e3a";

  const body = {
    clubName: clubName,
    userId: userId,
  };

  const URL_API = import.meta.env.VITE_URL_API;

  const searchHistory = async () => {
    try {
      const { data } = await axios.post(
        `${URL_API}/${clubName}/searchHistory`,
        body
      );
      console.log(data);
      setHistory(data);
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
  };

  useEffect(() => {
    searchHistory();
  }, [window.location.href]);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return dateTime.toLocaleString(undefined, options);
  };

  const status = (status) => {
    if (status === "approved") {
      return "Esta compra fue retirada";
    } else if (status === "rejected") {
      return "Se compra fue rechazada y reembolsada";
    } else {
      return "Compra Pendiente por retirar";
    }
  };

  const historyHarc = [
    {
        "ClientId": "87d03f75-42d5-4279-8228-926f6f79c8c5",
        "UserId": "auth0|65cfa8efa259fd3e778d8e3a",
        "amount": 80,
        "cart": [
          {
            "id": "7477daa0-7a68-4607-9109-9b9ec5e9a98c",
            "name": "RON",
            "price": 10,
            "quantity": 2
          },
          {
            "id": "42c38886-f827-4bf4-9ebd-fabaccf95b6e",
            "name": "TEQUILA",
            "price": 12,
            "quantity": 2
          },
          {
            "id": "1ef8cb11-844b-4dca-9270-dd339d790ccb",
            "name": "QUILMES",
            "price": 5,
            "quantity": 2
          },
          {
            "id": "243cc08d-1081-4af7-b6c7-b9316a126a85",
            "name": "VODKA",
            "price": 7,
            "quantity": 2
          },
          {
            "id": "1587ea1e-fa18-48c2-8813-771f9d532e64",
            "name": "MALBEC",
            "price": 6,
            "quantity": 2
          }
        ],
        "dateTime": "2024-02-19T18:15:28.080Z",
        "id": "9a127436-c95b-4c3a-a00c-3a62899a4bed",
        "paymentId": "72725009048",
        "status": "pending"
      },
      {
        "ClientId": "87d03f75-42d5-4279-8228-926f6f79c8c5",
        "UserId": "auth0|65cfa8efa259fd3e778d8e3a",
        "amount": 120,
        "cart": [
          {
            "id": "7477daa0-7a68-4607-9109-9b9ec5e9a98c",
            "name": "RON",
            "price": 10,
            "quantity": 2
          },
          {
            "id": "42c38886-f827-4bf4-9ebd-fabaccf95b6e",
            "name": "TEQUILA",
            "price": 12,
            "quantity": 2
          },
          {
            "id": "1ef8cb11-844b-4dca-9270-dd339d790ccb",
            "name": "QUILMES",
            "price": 5,
            "quantity": 2
          }
        ],
        "dateTime": "2024-02-19T18:15:28.080Z",
        "id": "9a127436-c95b-4c3a-a00c-3a62899a4b55",
        "paymentId": "72725009095",
        "status": "pending"
      }
      
      
    
    ]

  return (
    <div className={styles.Profile}>
      <NavBarUser></NavBarUser>

      <div className={styles.profileContainer}>
        <h2>HISTORIAL DE PEDIDOS </h2>

        {historyHarc.map((item) => (
          <div key={item.id}>
            <p>Fecha: {formatDateTime(item.dateTime)}</p>
            <p>Total: ${item.amount}</p>
            <p>Estado: {status(item.status)}</p>
            <button>Ver Detalle de Compra</button>
          </div>
        ))}
      </div>

      {isAuthenticated && (
        <button onClick={() => logout()} className={styles.profileButton}>
          Sign out
        </button>
      )}
    </div>
  );
}

export default Profile;
