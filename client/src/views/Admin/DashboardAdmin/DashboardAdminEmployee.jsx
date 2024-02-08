import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import style from "./dashboardAdmin.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../../redux/actions";

function DashboardAdmin() {
  const dispatch = useDispatch();

  // //!Descomentar al traer el estado global correcto y reemplazar EMPLOYEEE
  // const EMPLOYEEE = useSelector((state) => state.EMPLOYEEE);

  // //!Descomentar al traer la funcion correcta para dispatchy reemplazar GETEMPLOYEEE
  // useEffect(() => {
  //   dispatch(GETEMPLOYEE()); => Traer todos los employee
  // }, []);

  // //!Descomentar al traer el estado global correcto y reemplazar EMPLOYEEE
  // const rows = EMPLOYEEE.map((employee) => {
  //   return {
  //     id: employee.id,
  //     name: employee.name,
  //     lastname: employee.lastname,
  //     mail: employee.mail,
  //     status: employee.status,
  //   };
  // });

  const columns = [
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "lastname", headerName: "Apellido", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 250,
      renderCell: (params) => (
        //!Para las rutas dinamicas
        // ${params.row.id}
        <div>
          //!EN APP agregar a la ruta el campo /:idEmployee al final
          <Link to={`/admin/:clubName/updateemployee/${params.row.id}`}>
            {" "}
            <button
              className={style.button}
              onClick={() => handleEdit(params.row)}
            >
              Editar{" "}
            </button>
          </Link>
          <button
            className={style.button}
            onClick={() => handleDelete(params.row)}
          >
            Eliminar
          </button>
          <button
            className={style.button}
            onClick={() => handleBlock(params.row)}
          >
            Bloquear
          </button>
        </div>
      ),
    },
  ];

  function handleAddEmployeet(row) {
    console.log("Agregar Empleado:", row);
    // Aquí puedes implementar la lógica para editar la fila
  }

  function handleEdit(row) {
    console.log("Editar:", row);
    // Aquí puedes implementar la lógica para editar la fila
  }

  function handleDelete(row) {
    console.log("Eliminar:", row);
    // Aquí puedes implementar la lógica para eliminar la fila
  }

  function handleBlock(row) {
    console.log("Bloquear:", row);
    // Aquí puedes implementar la lógica para eliminar la fila
  }

  return (
    <>
      <div className={style.container}>
        <h2>Empleados</h2>

        <Link to={`/admin/testnati/addemployee`}>
          {" "}
          //!Ruta a agregar empleado
          <button className={style.button} onClick={handleAddEmployee}>
            {" "}
            Agregar Producto{" "}
          </button>
        </Link>

        <div className={style.DataGrid}>
          <DataGrid rows={rows} columns={columns} autoWidth />
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
