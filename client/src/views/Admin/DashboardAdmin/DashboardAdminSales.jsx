import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import style from "./dashboardAdmin.module.css";

const rows = [
  { id: 1, Orden: "#324", Usuario: "Maria Merie", Total: "$1900" },
  { id: 2, Orden: "#234", Usuario: "Pepe Cosme", Total: "$4059" },
  { id: 3, Orden: "#984", Usuario: "Fulano Tal", Total: "$2398" },
];
//

const columns = [
  { field: "Orden", headerName: "Orden", width: 250 },
  { field: "Usuario", headerName: "Usuario", width: 250 },
  { field: "Total", headerName: "Total", width: 250 },
  {
    field: "actions",
    headerName: "Acciones",
    width: 250,
    renderCell: (params) => (
      <div>
        <button
          className={style.buttonGrid}
          onClick={() => handleDetail(params.row)}
        >
          Ver detalle
        </button>
      </div>
    ),
  },
];

function handleDetail(row) {
  console.log("Editar:", row);
  // Aquí puedes implementar la lógica para editar la fila
}

function DashboardAdmin() {
  return (
    <>
      <div className={style.container}>
        <h2>Ventas</h2>
        <div className={style.DataGrid}>
          <DataGrid rows={rows} columns={columns} autoWidth />
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
