// DashboardAdmin.js
import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getCollaborators,
  getSales,
  logOut,
  handleAdminConfigView,
} from "../../../redux/actions";
import style from "./dashboardAdmin.module.css";
import DashboardAdminEmployee from "./DashboardAdminEmployee";
import DashboardAdminStock from "./DashboardAdminStock";
import DashboardAdminSales from "./DashboardAdminSales";
import DashboardAdminConfig from "./DashboardAdminConfig";

function DashboardAdmin() {
  const dispatch = useDispatch();
  const clubName = useSelector((state) => state.selectClientAdmin);
  const productsActive = useSelector((state) => state.productsActive);
  const collaboratorsActive = useSelector((state) => state.collaboratorsActive);
  const salesActive = useSelector((state) => state.salesActive);
  const adminConfigView = useSelector((state) => state.adminConfigView);

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

  const handleLogin = () => {
    dispatch(logOut());
  };

  return (
    <>
      <div className={style.container}>
        <h3 className={style.h3}> Bienvenido a {clubName}</h3>
        <h1 className={style.h1}>Administrador</h1>
        <div className={style.containerButton}>
          <div className={style.divButtonDash}>
            <span className={style.button} onClick={handleStock}>
              {" "}
              Stock{" "}
            </span>
            <span className={style.button} onClick={handleSales}>
              {" "}
              Ventas{" "}
            </span>
            <span className={style.button} onClick={handleEmployee}>
              {" "}
              Empleados{" "}
            </span>
          </div>

          <div className={style.divButtonConfig}>
            <span className={style.button} onClick={handleConfig}>
              {" "}
              Configuración{" "}
            </span>
            <span className={style.button} onClick={handleLogin}>
              {" "}
              Cerrar Sesión{" "}
            </span>
          </div>
        </div>

        <div>
          {productsActive && <DashboardAdminStock />}
          {salesActive && <DashboardAdminSales />}
          {collaboratorsActive && <DashboardAdminEmployee />}
          {adminConfigView && <DashboardAdminConfig />}
          {!productsActive &&
            !salesActive &&
            !collaboratorsActive &&
            !adminConfigView && <h2>Seleccione sección</h2>}
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
