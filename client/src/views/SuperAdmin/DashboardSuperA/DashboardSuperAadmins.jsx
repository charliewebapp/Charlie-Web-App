// Importamos las librerías necesarias
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteBolicheAdmins, getAdministrators } from "../../../redux/actions";
import style from "./dashboard.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Definimos el componente DashboardSuperAadmins
function DashboardSuperAadmins() {
  // Usamos useDispatch para disparar acciones de Redux
  const dispatch = useDispatch();

  // Al montar el componente, obtenemos los administradores
  useEffect(() => {
    dispatch(getAdministrators());
  }, []);

  // Usamos useSelector para acceder al estado de Redux
  const allAdministratorsState = useSelector(
    (state) => state.allAdministrators
  );
  const allBolichesState = useSelector((state) => state.allBoliches);
  const clubID = useSelector((state) => state.currentClubId);

  // Función para filtrar administradores por club
  function filterAdminsByClub(allAdministratorsState, clubID) {
    return allAdministratorsState.filter((admin) => admin.ClientId === clubID);
  }

  // Filtramos los administradores por club
  const filteredAdmins = allAdministratorsState
    ? filterAdminsByClub(allAdministratorsState, clubID)
    : [];

  // Función para obtener el nombre de un club a partir de su ID
  function getClubName(clubId) {
    const club = allBolichesState.find((boliche) => boliche.id === clubId);
    return club ? club.name : "";
  }
  const clubName = getClubName(clubID).toUpperCase();

  // Mapeamos los administradores filtrados a filas para el DataGrid
  const rows = filteredAdmins.map((admin) => {
    // const club = allBolichesState.find(
    //   (boliche) => boliche.id === admin.ClientId
    // );
    // const clubName = club ? club.name : "";
    return {
      id: admin.id,
      name: admin.name_client,
      mail: admin.mail,
      club: getClubName(admin.ClientId),
      status: admin.status,
    };
  });

  // Función para manejar la eliminación de un administrador
  function handleDelete(row) {
    // Usamos Swal para confirmar la eliminación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este administrador!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        const clubId = row.club;
        const id = allBolichesState.find((club) => club.id === clubId).name;
        const clubName = row.id;

        // Si se confirma la eliminación, despachamos la acción deleteBolicheAdmins
        dispatch(deleteBolicheAdmins(id, clubName));
        Swal.fire(
          "Eliminado!",
          "El administrador ha sido eliminado.",
          "success"
        );
      }
    });
  }

  // Definimos las columnas del DataGrid
  const columns = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "mail", headerName: "Email", width: 250 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "club", headerName: "Boliche", width: 150 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <div>
          <Link to={`/superadmin/updateadmin/${params.row.id}`}>
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

  // Renderizamos el componente
  return (
    <div className={style.linkContainer}>
      <h2>{clubName}</h2>

      <div className={style.DataGrid}>
        <DataGrid rows={rows} columns={columns} autoPageSize rowHeight={40} />
      </div>
      <Link to="/superadmin/addadmin" className={style.linkContainer}>
        <button className={style.btnCreate}>CREAR NUEVO ADMIN</button>
      </Link>
    </div>
  );
}

// Exportamos el componente
export default DashboardSuperAadmins;
