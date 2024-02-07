import * as React from "react";
import { useState } from "react";
import style from "./dashboardAdmin.module.css";
import DashboardAdminEmployee from "./DashboardAdminEmployee";
import DashboardAdminStock from "./DashboardAdminStock";
import DashboardAdminSales from "./DashboardAdminSales";

function DashboardAdmin() {
  const [stock, setStock] = useState(true);
  const [sales, setSales] = useState(false);
  const [employee, setEmployee] = useState(false);

  const handleStock = () => {
    setSales(false);
    setEmployee(false);
    setStock(true);
  };
  const handleSales = () => {
    setStock(false);
    setEmployee(false);
    setSales(true);
  };
  const handleEmployee = () => {
    setStock(false);
    setSales(false);
    setEmployee(true);
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
        </div>

        {/* Renderizar condicionalmente segun el boton elegio */}
        <div>
          {stock && <DashboardAdminStock />}
          {sales && <DashboardAdminSales />}
          {employee && <DashboardAdminEmployee />}
          {!stock && !sales && !employee && <h1>Seleccione sección</h1>}
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
