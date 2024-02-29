import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router-dom";
import NavBarUser from "../NavBarUser/NavBarUser";
import styles from "./Profile.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDetailQrCode, getAllOrders } from "../../../redux/actions";
import { BsQrCode } from "react-icons/bs";

function Profile() {
  const { clubName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //log out de Auth0
  const { logout, isAuthenticated } = useAuth0();
  const handleLogoutAlert = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fccf83",
      cancelButtonColor: "rgba(221, 51, 51, 0.9)",
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        logout();
      }
    });
  };

  const detail = useSelector((state) => state.detailQrCode);
  const allOrders = useSelector((state) => state.allOrders);
  const bolicheID = useSelector((state) => state.myBolicheID);
  const usuario = useSelector((state) => state.myUser);
  const myUserID = usuario.id;

  console.log(allOrders, "allOrders");

  console.log(bolicheID, "bolicheID");
  console.log(myUserID, "myUserID");

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
      setHistory(data);
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
  };

  useEffect(() => {
    searchHistory();
    dispatch(getAllOrders(bolicheID, myUserID));
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

  // useEffect(() => {
  //   if (detail.length > 0) {
  //     setIsLoading(false);
  //     navigate("/orderdetail"); //!pasar el id de la orden
  //   }
  // }, [detail]);

  const [isLoading, setIsLoading] = useState(null);

  const renderQr = (paymentId) => {
    console.log(paymentId, "paymentId");
    setIsLoading(true);
    dispatch(getDetailQrCode(paymentId)).finally(() =>
      navigate("/orderdetail")
    );
    //!pasar el id de la orden
  };

  console.log(allOrders, "allOrders");
  return (
    <div className={styles.Profile}>
      <NavBarUser></NavBarUser>

      <div className={styles.profileContainer}>
        {isLoading ? <div>Loading...</div> : null}
        <h2 className={styles.title}>HISTORIAL DE PEDIDOS </h2>

        <div className={styles.scroll}>
          {allOrders.map((item) => (
            <div
              className={`${styles.history} ${
                styles[item.status.toLowerCase()]
              }`}
              value={item.status}
              key={item.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className={styles.cartHistory}>
                <div className={styles.cartHistoryleft}>
                  <span>
                    {item.cart.reduce(
                      (total, product) => total + product.quantity,
                      0
                    )}
                    &nbsp; unidades{" "}
                  </span>
                  <span className={styles.total}>${item.amount}</span>
                </div>

                <div className={styles.cartHistoryCenter}>
                  <span>Estado</span>
                  <span className={styles.estado}>
                    {item.status === "approved"
                      ? "Entregado"
                      : item.status === "rejected"
                      ? "Rechazado"
                      : item.status === "pending"
                      ? "Pagado"
                      : "Estado Desconocido"}
                  </span>
                </div>
                {(item.status === "rejected" || item.status === "approved") && (
                  <div className={styles.cartHistoryright}>
                    <span>Hora</span>
                    <span className={styles.hora}>
                      {new Date(item.dateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}

                {item.status === "pending" && (
                  <button
                    className={styles.button}
                    onClick={() => renderQr(item.paymentId)}
                    style={{ marginRight: "10px" }} // Ajusta el margen a tu gusto
                  >
                    <BsQrCode className={styles.icon} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className={styles.profileButton}
        onClick={() =>
          window.open("https://wa.me/message/ARRZPVT3NY6LG1", "_blank")
        }
      >
        Soporte
      </button>

      {isAuthenticated && (
        <button onClick={handleLogoutAlert} className={styles.profileButton}>
          Cerrar Sesión
        </button>
      )}
    </div>
  );
}

export default Profile;
