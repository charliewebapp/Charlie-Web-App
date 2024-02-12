import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteBoliche, getBoliches } from "../../../redux/actions";
import { Link } from "react-router-dom";
import style from "./dashboardSuperA.module.css";

function DashboardSuperAclubs({ handleAdmins }) {
  const dispatch = useDispatch();

  const allBolichesState = useSelector((state) => state.allBoliches);
  console.log("todos los boliches", allBolichesState);

  useEffect(() => {
    dispatch(getBoliches());
  }, []);

  function handleDelete(row) {
    dispatch(deleteBoliche(row.name));
  }

  const rows = allBolichesState.map((club) => {
    return {
      id: club.id,
      name: club.name,
      ciudad: club.city,
      direccion: club.adress,
      status: club.status,
    };
  });
  function handleDelete(row) {
    dispatch(deleteBoliche(row.name));
  }

  function handleBlock(row) {
    // Aquí puedes implementar la lógica para bloquear la fila
  }

  const columns = [
    { field: "name", headerName: "Nombre", width: 250 },
    { field: "ciudad", headerName: "Ciudad", width: 250 },
    { field: "direccion", headerName: "Direccion", width: 250 },
    { field: "status", headerName: "Status", width: 250 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 250,
      renderCell: (params) => (
        <div>
          <button
            className={style.button}
            onClick={() => handleAdmins(params.row)}
          >
            Admins
          </button>

          <Link to={`/superadmin/updateclub/${params.row.id}`}>
            <button
              className={style.button}
              onClick={() => handleEdit(params.row)}
            >
              Editar
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

  function handleEdit(row) {
    console.log("Editar:", row);
    // Aquí puedes implementar la lógica para editar la fila
  }

  return (
    <>
      <div className={style.container}>
        <h2>Clubs</h2>
        <br />
        <button className={style.button}>
          <Link to="/superadmin/addclub">Crear Nuevo Club</Link>
        </button>
        <div className={style.DataGrid}>
          <DataGrid rows={rows} columns={columns} autoWidth />
        </div>
      </div>
    </>
  );
}

export default DashboardSuperAclubs;
