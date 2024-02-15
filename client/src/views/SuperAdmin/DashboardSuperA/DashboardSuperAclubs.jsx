import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteBoliche, getBoliches } from "../../../redux/actions";
import { Link } from "react-router-dom";
import style from "./dashboardSuperA.module.css";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este boliche!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBoliche(row.name));
        Swal.fire("Eliminado!", "El boliche ha sido eliminado.", "success");
      }
    });
  }

  function handleBlock(row) {
    // Aquí puedes implementar la lógica para bloquear la fila
  }

  const columns = [
    { field: "name", headerName: "Nombre", width: 250 },
    { field: "ciudad", headerName: "Ciudad", width: 200 },
    { field: "direccion", headerName: "Direccion", width: 250 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 300,
      renderCell: (params) => (
        <div className={style.divButtonDash}>
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
        <div className={style.linkContainer}>
          <Link to="/superadmin/addclub" className={style.linkContainer}>
            <button className={style.buttonConfig}>Crear Nuevo Club</button>
          </Link>

          <div className={style.DataGrid}>
            <DataGrid rows={rows} columns={columns} autoWidth />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardSuperAclubs;
