// // DashboardAdmin.js
// import * as React from "react";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getProducts,
//   getCollaborators,
//   getSales,
//   logOut,
//   handleAdminConfigView,
// } from "../../../redux/actions";
// import style from "./dashboardAdmin.module.css";
// import DashboardAdminEmployee from "./DashboardAdminEmployee";
// import DashboardAdminStock from "./DashboardAdminStock";
// import DashboardAdminSales from "./DashboardADminSales";
// import DashboardAdminConfig from "./DashboardAdminConfig";

// function DashboardAdmin() {
//   const dispatch = useDispatch();
//   const clubName = useSelector((state) => state.selectClientAdmin);
//   const productsActive = useSelector((state) => state.productsActive);
//   const collaboratorsActive = useSelector((state) => state.collaboratorsActive);
//   const salesActive = useSelector((state) => state.salesActive);
//   const adminConfigActive = useSelector((state) => state.adminConfigActive);

//   const handleStock = () => {
//     dispatch(getProducts(clubName));
//   };
//   const handleSales = () => {
//     dispatch(getSales(clubName));
//   };
//   const handleEmployee = () => {
//     dispatch(getCollaborators(clubName));
//   };

//   const handleConfig = () => {
//     dispatch(handleAdminConfigView());
//   };

//   const handleLogin = () => {
//     dispatch(logOut());
//   };

//   return (
//     <>
//       <div className={style.container}>
//         <h3 className={style.h3}> Bienvenido a {clubName}</h3>
//         <h1 className={style.h1}>Administrador</h1>
//         <div className={style.containerButton}>
//           <div className={style.divButtonDash}>
//             <span className={style.button} onClick={handleStock}>
//               {" "}
//               Stock{" "}
//             </span>
//             <span className={style.button} onClick={handleSales}>
//               {" "}
//               Ventas{" "}
//             </span>
//             <span className={style.button} onClick={handleEmployee}>
//               {" "}
//               Empleados{" "}
//             </span>
//           </div>

//           <div className={style.divButtonConfig}>
//             <span className={style.button} onClick={handleConfig}>
//               {" "}
//               Configuración{" "}
//             </span>
//             <span className={style.button} onClick={handleLogin}>
//               {" "}
//               Cerrar Sesión{" "}
//             </span>
//           </div>
//         </div>

//         <div>
//           {productsActive && <DashboardAdminStock />}
//           {salesActive && <DashboardAdminSales />}
//           {collaboratorsActive && <DashboardAdminEmployee />}
//           {adminConfigActive && <DashboardAdminConfig />}
//           {!productsActive &&
//             !salesActive &&
//             !collaboratorsActive &&
//             !adminConfigActive && <h3>Seleccione sección</h3>}
//         </div>
//       </div>
//     </>
//   );
// }

// export default DashboardAdmin;
// // DashboardAdmin.js
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
  const productsActive = useSelector((state) => state.productsActive);
  const collaboratorsActive = useSelector((state) => state.collaboratorsActive);
  const salesActive = useSelector((state) => state.salesActive);
  const adminConfigActive = useSelector((state) => state.adminConfigActive);

  useEffect(() => {
    dispatch(getProducts(clubName));
  }, []);

  const handleStock = () => {
    dispatch(getProducts(clubName));
  };
  const handleSales = () => {
    dispatch(getSales(clubName));
  };
  const handleEmployee = () => {
    dispatch(getCollaborators(clubName));
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
  }

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
