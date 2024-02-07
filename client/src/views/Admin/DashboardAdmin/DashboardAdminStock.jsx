import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import style from "./dashboardAdmin.module.css";

const rows = [
  {
    id: 1,
    Categoria: "Tragos",
    Bebida: "Mojito",
    Precio: "$1200",
    Stock: "No",
  },
  {
    id: 2,
    Categoria: "Tragos",
    Bebida: "Fernet Branca",
    Precio: "$1200",
    Stock: "Si",
  },
  {
    id: 3,
    Categoria: "Tragos",
    Bebida: "Fernet Branca",
    Precio: "$1200",
    Stock: "Si",
  },
  {
    id: 4,
    Categoria: "Sin alcohol",
    Bebida: "Sprite",
    Precio: "$1200",
    Stock: "Si",
  },
];

const columns = [
  { field: "Categoria", headerName: "Categoria", width: 250 },
  { field: "Bebida", headerName: "Bebida", width: 250 },
  { field: "Precio", headerName: "Precio", width: 250 },
  { field: "Stock", headerName: "Stock", width: 250 },
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

function handleAddStock() {
  console.log("Agregar");
  // Aquí puedes implementar la lógica para eliminar la fila
}

function DashboardAdmin() {
  return (
    <>
      <div className={style.container}>
        <h2>Stock</h2>
        <button className={style.button} onClick={handleAddStock}>
          {" "}
          Agregar Producto{" "}
        </button>
        <div className={style.DataGrid}>
          <DataGrid rows={rows} columns={columns} autoWidth />
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
