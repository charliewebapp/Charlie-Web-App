import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCollaborator, getCollaborators } from "../../../redux/actions";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
import Swal from "sweetalert2";

function DashboardAdminEmployee() {
  const dispatch = useDispatch();
  const clubName =JSON.parse((localStorage.getItem("clientName")));
  const allCollaboratorsState = useSelector((state) => state.allCollaborators);

  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    dispatch(getCollaborators(clubName));
  }, []);

  const rows = allCollaboratorsState.map((employee) => {
    return {
      id: employee.id,
      name: employee.name.toUpperCase(),
      lastname: employee.lastname.toUpperCase(),
      mail: employee.mail,
      status: employee.status,
    };
  });

  const columns = [
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "lastname", headerName: "Apellido", width: 150 },
    { field: "mail", headerName: "Email", width: 200 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 250,
      renderCell: (params) => (
        <div>
          <Link to={`/admin/${clubName}/updateemployee/${params.row.id}`}>
            {" "}
            <button
              className={style.acciones}
              onClick={() => handleEdit(params.row)}
            >
              Editar
            </button>
          </Link>
          <button
            className={style.accionDelete}
            onClick={() => openConfirmationDialog(params.row)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  function handleAddEmployee(row) {
    console.log("Agregar Empleado:", row);
    //
  }

  function handleEdit(row) {
    console.log("Editar:", row);
    //
  }

  // rgba(231, 183, 110, 0.8)
  function openConfirmationDialog(employee) {
    setEmployeeToDelete(employee);
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar al empleado "${employee.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(187, 131, 43)",
      cancelButtonColor: "rgba(221, 51, 51, 0.9)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(employee);
      }
    });
  }

  function handleDelete(employee) {
    try {
      dispatch(deleteCollaborator(employee.id, clubName));
      Swal.fire({
        title: "Éxito",
        text: "El colaborador se eliminó correctamente",
        icon: "success",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={style.linkContainer}>
      <h2>EMPLEADOS</h2>

      <div className={style.DataGrid}>
        <DataGrid rows={rows} columns={columns} autoPageSize rowHeight={40} />
      </div>

      <Link
        to={`/admin/${clubName}/addemployee`}
        className={style.linkContainer}
      >
        <button className={style.btnCreate} onClick={handleAddEmployee}>
          AGREGAR EMPLEADO
        </button>
      </Link>
    </div>
  );
}

export default DashboardAdminEmployee;
