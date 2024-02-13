// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { deleteBolicheAdmins, getAdministrators } from "../../../redux/actions";
// import style from "./dashboardSuperA.module.css";
// import { Link } from "react-router-dom";

// function DashboardSuperAadmins() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAdministrators());
//   }, []);

//   const allAdministratorsState = useSelector(
//     (state) => state.allAdministrators
//   );
//   const allBolichesState = useSelector((state) => state.allBoliches);

//   console.log("todos los administradores", allAdministratorsState);

//   const clubID = useSelector((state) => state.currentClubId);

//   function filterAdminsByClub(allAdministratorsState, clubID) {
//     return allAdministratorsState.filter((admin) => admin.ClientId === clubID);
//   }

//   console.log(
//     "filterAdminsByClub",
//     filterAdminsByClub(allAdministratorsState, clubID)
//   );

//   const filteredAdmins = allAdministratorsState
//     ? filterAdminsByClub(allAdministratorsState, clubID)
//     : [];

//   console.log("filteredAdmins", filteredAdmins);

//   const rows = filteredAdmins.map((admin) => {
//     return {
//       id: admin.id,
//       name: admin.name_client,
//       mail: admin.mail,
//       club: admin.ClientId,
//       status: admin.status,
//     };
//   });

//   // function handleEdit(row) {
//   //   console.log("Editar:", row);
//   //   // Aquí puedes implementar la lógica para editar la fila
//   // }

//   function handleDelete(row) {
//     const clubId = row.club;

//     const id = allBolichesState.find((club) => club.id === clubId).name;

//     const clubName = row.id;

//     dispatch(deleteBolicheAdmins(id, clubName));
//   }

//   const columns = [
//     { field: "name", headerName: "Nombre", width: 250 },
//     { field: "mail", headerName: "Email", width: 250 },
//     { field: "club", headerName: "Club ID", width: 250 },
//     { field: "status", headerName: "Status", width: 250 },
//     {
//       field: "actions",
//       headerName: "Acciones",
//       width: 250,
//       renderCell: (params) => (
//         <div>
//           <Link to={`/superadmin/updateadmin/${params.row.id}`}>
//             <button
//               className={style.button}
//               onClick={() => handleEdit(params.row)}
//             >
//               Editar
//             </button>
//           </Link>

//           <button
//             className={style.button}
//             onClick={() => handleDelete(params.row)}
//           >
//             Eliminar
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div className={style.container}>
//         <h2>Admins</h2>
//         <br />
//         <button className={style.button}>
//           <Link to="/superadmin/addadmin">Crear Nuevo Admin</Link>
//         </button>
//         <div className={style.DataGrid}>
//           <DataGrid rows={rows} columns={columns} autoWidth />
//         </div>
//       </div>
//     </>
//   );
// }

// export default DashboardSuperAadmins;
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteBolicheAdmins, getAdministrators } from "../../../redux/actions";
import style from "./dashboardSuperA.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function DashboardSuperAadmins() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdministrators());
  }, []);

  const allAdministratorsState = useSelector(
    (state) => state.allAdministrators
  );
  const allBolichesState = useSelector((state) => state.allBoliches);

  const clubID = useSelector((state) => state.currentClubId);

  function filterAdminsByClub(allAdministratorsState, clubID) {
    return allAdministratorsState.filter((admin) => admin.ClientId === clubID);
  }

  const filteredAdmins = allAdministratorsState
    ? filterAdminsByClub(allAdministratorsState, clubID)
    : [];

  const rows = filteredAdmins.map((admin) => {
    return {
      id: admin.id,
      name: admin.name_client,
      mail: admin.mail,
      club: admin.ClientId,
      status: admin.status,
    };
  });

  function handleDelete(row) {
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

        dispatch(deleteBolicheAdmins(id, clubName));
        Swal.fire(
          "Eliminado!",
          "El administrador ha sido eliminado.",
          "success"
        );
      }
    });
  }

  const columns = [
    { field: "name", headerName: "Nombre", width: 250 },
    { field: "mail", headerName: "Email", width: 250 },
    { field: "club", headerName: "Club ID", width: 250 },
    { field: "status", headerName: "Status", width: 250 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 250,
      renderCell: (params) => (
        <div>
          <Link to={`/superadmin/updateadmin/${params.row.id}`}>
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
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={style.container}>
        <h2>Admins</h2>
        <div className={style.linkContainer}>
          <Link to="/superadmin/addadmin" className={style.linkContainer}>
            <button className={style.buttonConfig}>Crear Nuevo Admin</button>
          </Link>

          <div className={style.DataGrid}>
            <DataGrid rows={rows} columns={columns} autoWidth />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardSuperAadmins;
