// DashboardAdmin.js
import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getCollaborators,
  getSales,
  logOut,
  handleAdminConfigView,
} from "../../../redux/actions";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
import DashboardAdminEmployee from "./DashboardAdminEmployee";
import DashboardAdminStock from "./DashboardAdminStock";
import DashboardAdminSales from "./DashboardAdminSales";
import DashboardAdminConfig from "./DashboardAdminConfig";
import logotype from "../../../assets/img/charlielogo.png";
import imgCharlie from "../../../assets/img/charlie.png";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import Swal from "sweetalert2";

function DashboardAdmin() {
  const dispatch = useDispatch();
  const clubName = useSelector((state) => state.selectClientAdmin);

  const image = useSelector((state) => state.selectClientImage);
  const productsActive = useSelector((state) => state.productsActive);
  const collaboratorsActive = useSelector((state) => state.collaboratorsActive);
  const salesActive = useSelector((state) => state.salesActive);
  const adminConfigActive = useSelector((state) => state.adminConfigActive);
  const allBoliches = useSelector((state) => state.allBoliches);

  const actualClient = allBoliches.find((boliche) => boliche.name === clubName);
  const clientId = actualClient.id; //* Para enviar al reducer
  useEffect(() => {
    dispatch(getProducts(clubName));
  }, []);

  const [loading, setLoading] = useState(false);

  console.log(clubName, "clubName");

  const handleStock = () => {
    if (!loading) {
      setLoading(true);
      dispatch(getProducts(clubName)).finally(() => setLoading(false));
    }
  };

  const handleSales = () => {
    if (!loading) {
      setLoading(true);
      dispatch(getSales(clubName, clientId)).finally(() => setLoading(false));
    }
  };

  const handleEmployee = () => {
    if (!loading) {
      setLoading(true);
      dispatch(getCollaborators(clubName)).finally(() => setLoading(false));
    }
  };

  const handleConfig = () => {
    dispatch(handleAdminConfigView());
  };

  const openConfirmationLogOut = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres cerrar sesión?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(187, 131, 43)",
      cancelButtonColor: "rgba(221, 51, 51, 0.9)",
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logOut());
      }
    });
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.aside}>
          <img src={logotype} className={style.asideLogo} />
          <div className={style.logotype}>
            <img src={logotype} className={style.logo} />
            CHARLIE
          </div>
          <div className={style.buttones}>
            <button className={style.button} onClick={handleStock}>
              STOCK
            </button>
            <button className={style.button} onClick={handleSales}>
              VENTAS
            </button>
            <button className={style.button} onClick={handleEmployee}>
              COLABORADORES
            </button>
          </div>

          <div className={style.config}>
            <button className={style.btnCfg} onClick={handleConfig}>
              <IoSettingsSharp />
              Configuración
            </button>
            <button className={style.btnCfg} onClick={openConfirmationLogOut}>
              <RiLogoutBoxLine />
              Cerrar Sesión
            </button>
          </div>
        </div>
        <div className={style.views}>
          <div className={style.navbar}>
            <h1 className={style.h1}>DASHBOARD ADMINISTRADOR</h1>
          </div>
          <div className={style.dashboard}>
            <img src={image} alt="logo-boliche" className={style.logoBoliche} />
            {
              <div>
                {productsActive && <DashboardAdminStock />}
                {salesActive && <DashboardAdminSales />}
                {collaboratorsActive && <DashboardAdminEmployee />}
                {adminConfigActive && <DashboardAdminConfig />}
                {!productsActive &&
                  !salesActive &&
                  !collaboratorsActive &&
                  !adminConfigActive && <h3>Seleccione sección</h3>}
              </div>
            }
            <img src={imgCharlie} className={style.imgCharlie}></img>
          </div>

          <div className={style.footer}>© Charlie</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
