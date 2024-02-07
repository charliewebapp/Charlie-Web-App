import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import style from "./dashboardAdmin.module.css";

const rows = [
  { id: 1, Nombre: "Pepe", Email: "Mojo@gmail.com", Status: "Activo" },
  { id: 2, Nombre: "Pepa", Email: "Ferno@gmail.com", Status: "Activo" },
  { id: 3, Nombre: "Javier", Email: "Spro@gmail.com", Status: "Activo" },
];

const columns = [
  { field: "Nombre", headerName: "Nombre", width: 250 },
  { field: "Email", headerName: "Email", width: 250 },
  { field: "Status", headerName: "Status", width: 250 },
  {
    field: "actions",
    headerName: "Acciones",
    width: 250,
    renderCell: (params) => (
      <div>
        <button className={style.button} onClick={() => handleEdit(params.row)}>
          Editar
        </button>
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

function handleEdit(row) {
  console.log("Editar:", row);
  // Aquí puedes implementar la lógica para editar la fila
}

function handleDelete(row) {
  console.log("Eliminar:", row);
  // Aquí puedes implementar la lógica para eliminar la fila
}

function handleBlock(row) {
  console.log("Eliminar:", row);
  // Aquí puedes implementar la lógica para eliminar la fila
}

function DashboardAdmin() {
  return (
    <>
      <div className={style.container}>
        <h2>Empleados</h2>
        <div className={style.DataGrid}>
          <DataGrid rows={rows} columns={columns} autoWidth />
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
