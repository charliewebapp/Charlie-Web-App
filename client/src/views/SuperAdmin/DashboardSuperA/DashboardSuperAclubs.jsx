import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteBoliche, getBoliches } from "../../../redux/actions";
import { Link } from "react-router-dom";
import style from "./dashboard.module.css";
import Swal from "sweetalert2";
function DashboardSuperAclubs({ handleAdmins }) {
  const dispatch = useDispatch();

  const allBolichesState = useSelector((state) => state.allBoliches);
  console.log("todos los boliches", allBolichesState);

  useEffect(() => {
    dispatch(getBoliches());
  }, []);
  console.log(getBoliches, "ACA");
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

  const columns = [
    { field: "name", headerName: "Nombre", width: 180 },
    { field: "ciudad", headerName: "Ciudad", width: 180 },
    { field: "direccion", headerName: "Direccion", width: 200 },
    { field: "status", headerName: "Status", width: 80 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 250,
      renderCell: (params) => (
        <div className={style.divButtonDash}>
          <button
            className={style.acciones}
            onClick={() => handleAdmins(params.row)}
          >
            Admins
          </button>

          <Link to={`/superadmin/updateclub/${params.row.id}`}>
            <button
              className={style.acciones}
              onClick={() => handleEdit(params.row)}
            >
              Editar
            </button>
          </Link>
          <button
            className={style.accionDelete}
            onClick={() => handleDelete(params.row)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={style.linkContainer}>
      <h2>BOLICHES</h2>
      <div className={style.DataGrid}>
        <DataGrid rows={rows} columns={columns} autoPageSize rowHeight={40} />
      </div>
      <Link to="/superadmin/addclub" className={style.linkContainer}>
        <button className={style.btnCreate}>CREAR NUEVO BOLICHE</button>
      </Link>
    </div>
  );
}

export default DashboardSuperAclubs;
