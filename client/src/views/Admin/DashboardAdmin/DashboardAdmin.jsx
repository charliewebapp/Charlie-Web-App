import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getCollaborators,
  getSales,
  logOut,
} from "../../../redux/actions";
import style from "./dashboardAdmin.module.css";
import DashboardAdminEmployee from "./DashboardAdminEmployee";
import DashboardAdminStock from "./DashboardAdminStock";
import DashboardAdminSales from "./DashboardAdminSales";

function DashboardAdmin() {
  const dispatch = useDispatch();
  const clubName = useSelector((state) => state.selectClientAdmin);
  const productsActive = useSelector((state) => state.productsActive);
  const collaboratorsActive = useSelector((state) => state.collaboratorsActive);
  const salesActive = useSelector((state) => state.salesActive);

  const handleStock = () => {
    dispatch(getProducts(clubName));
  };
  const handleSales = () => {
    dispatch(getSales(clubName));
  };
  const handleEmployee = () => {
    dispatch(getCollaborators(clubName));
  };

  const handleLogin = () => {
    dispatch(logOut());
  };

  return (
    <>
      <div className={style.container}>
        <h1> Dashboard Administrador</h1>

        <div>
          <button className={style.button} onClick={handleStock}>
            {" "}
            Stock{" "}
          </button>
          <button className={style.button} onClick={handleSales}>
            {" "}
            Ventas{" "}
          </button>
          <button className={style.button} onClick={handleEmployee}>
            {" "}
            Empleados{" "}
          </button>
          <button className={style.button} onClick={handleLogin}>
            {" "}
            Cerrar Sesión{" "}
          </button>
        </div>

        {/* Renderizar condicionalmente segun el boton elegio */}
        <div>
          {productsActive && <DashboardAdminStock />}
          {salesActive && <DashboardAdminSales />}
          {collaboratorsActive && <DashboardAdminEmployee />}
          {!productsActive && !salesActive && !collaboratorsActive && (
            <h2>Seleccione sección</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
