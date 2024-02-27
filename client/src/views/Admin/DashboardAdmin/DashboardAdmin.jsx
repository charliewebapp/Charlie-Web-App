// DashboardAdmin.js
import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getCollaborators,
  getSales,
  getAdmins,
  getBoliches,
  getAllColaborators,
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
  const clubName =JSON.parse((localStorage.getItem("clientName")));
  const clientId = localStorage.getItem("clientId"); //* Se podria llegar a sacar del local storage.
  const image = JSON.parse(localStorage.getItem("bolicheimagen")); //* Se podria llegar a sacar del local storage.
  console.log("SEGUN ESTO EL CLUB NAME es: ",clubName, "y el lenght es ", clubName.length)
  
  


  // useEffect(() => {
  //   if (clubName.length === 0) {
  //    console.log("Entro al useefect...")
  //     fetchData();
  //   } else {
  //     console.log("Entro a la instancia false del USefect")
  //      setLoading(false);
  //   }
  // }, []);
    
   



  // if (loading) {
  //   // Muestra un indicador de carga o cualquier otro componente que desees mientras se están obteniendo los datos
  //   return <div>Cargando...</div>;
  // }


  
  const productsActive = useSelector((state) => state.productsActive);// Esta informacion es dinamica NO PUEDO PONERLA EN EL LOCAL STORAGE
  const collaboratorsActive = useSelector((state) => state.collaboratorsActive);// Esta informacion es dinamica NO PUEDO PONERLA EN EL LOCAL STORAGE
  const salesActive = useSelector((state) => state.salesActive);// Esta informacion es dinamica NO PUEDO PONERLA EN EL LOCAL STORAGE
  const adminConfigActive = useSelector((state) => state.adminConfigActive);// Esta informacion es dinamica NO PUEDO PONERLA EN EL LOCAL STORAGE
  const allBoliches = useSelector((state) => state.allBoliches);// Esta informacion es dinamica NO PUEDO PONERLA EN EL LOCAL STORAGE

  const actualClient = clubName; // Esta informacion es dinamica NO PUEDO PONERLA EN EL LOCAL STORAGE


  console.log(clientId)
    // useEffect(() => {
  //   dispatch(getProducts(clubName));
  // }, []);

  

  console.log(clubName, "clubName");
  const [loading, setLoading] = useState(false);
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
        localStorage.clear()
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
