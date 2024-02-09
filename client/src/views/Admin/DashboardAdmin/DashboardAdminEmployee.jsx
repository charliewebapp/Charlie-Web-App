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
import { deleteCollaborator, getCollaborators } from "../../../redux/actions";

function DashboardAdminEmployee() {
  const dispatch = useDispatch();
  const clubName = useSelector((state) => state.selectClientAdmin);
  const allCollaboratorsState = useSelector((state) => state.allCollaborators);

  useEffect(() => {
    dispatch(getCollaborators(clubName));
  }, []);

  const rows = allCollaboratorsState.map((employee) => {
    return {
      id: employee.id,
      name: employee.name,
      lastname: employee.lastname,
      mail: employee.mail,
      status: employee.status,
    };
  });

  //!eliminar al conectar estado global
  // const rows = [
  //   { id: 1, name: "#juana", lastname: "Maria Merie", email: "hola@gmail", status: "activo" },
  // ];

  const columns = [
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "lastname", headerName: "Apellido", width: 150 },
    { field: "mail", headerName: "Email", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 250,
      renderCell: (params) => (


        <div>
          <Link to={`/admin/${clubName}/updateemployee/${params.row.id}`}>
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
            onClick={handleDelete(params.row)}
          >
            Eliminar
          </button>

        </div>
      ),
    },
  ];

  function handleAddEmployee(row) {
    console.log("Agregar Empleado:", row);
    // Aquí puedes implementar la lógica para editar la fila
  }

  function handleEdit(row) {
    console.log("Editar:", row);
    // Aquí puedes implementar la lógica para editar la fila
  }

  function handleDelete(row) {
    dispatch(deleteCollaborator(row.id, clubName))
    console.log("Eliminar:", row);
  }

  function handleBlock(row) {
    console.log("Bloquear:", row);
    // Aquí puedes implementar la lógica para eliminar la fila
  }

  return (
    <>
      <div className={style.container}>
        <h2>Empleados</h2>


        <Link to={`/admin/${clubName}/addemployee`}>
          {" "}

          <button className={style.button} onClick={handleAddEmployee}>
            {" "}
            Agregar Colaborador{" "}
          </button>
        </Link>

        <div className={style.DataGrid}>
          <DataGrid rows={rows} columns={columns} autoWidth />
        </div>
      </div>
    </>
  );
}

export default DashboardAdminEmployee;
