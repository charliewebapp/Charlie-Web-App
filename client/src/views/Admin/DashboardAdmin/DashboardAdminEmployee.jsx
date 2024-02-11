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

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(getCollaborators(clubName));
  }, []);

  console.log("todos colaboradores", allCollaboratorsState);

  const rows = allCollaboratorsState.map((employee) => {
    return {
      id: employee.id,
      name: employee.name,
      lastname: employee.lastname,
      mail: employee.mail,
      status: employee.status,
    };
  });

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
              className={style.buttonGrid}
              onClick={() => handleEdit(params.row)}
            >
              Editar{" "}
            </button>
          </Link>
          <button
            className={style.buttonGrid}
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

  function openConfirmationDialog(employee) {
    setEmployeeToDelete(employee);
    setConfirmationDialogOpen(true);
  }

  function closeConfirmationDialog() {
    setConfirmationDialogOpen(false);
  }

  function handleDelete(employee) {
    dispatch(deleteCollaborator(employee.id, clubName));
    closeConfirmationDialog();
    setSnackbarOpen(true);
    console.log("Eliminar:", employee);
  }

  function handleBlock(row) {
    console.log("Bloquear:", row);
    // Aquí puedes implementar la lógica para eliminar la fila
  }

  return (
    <>
      <div className={style.container}>
        <h2>Empleados</h2>

        <div className={style.linkContainer}>
          <Link to={`/admin/${clubName}/addemployee`}>
            {" "}
            <button className={style.buttonConfig} onClick={handleAddEmployee}>
              {" "}
              Agregar Colaborador{" "}
            </button>
          </Link>
        </div>

        <div className={style.DataGrid}>
          <DataGrid rows={rows} columns={columns} autoWidth />
        </div>
        <Dialog
          open={confirmationDialogOpen}
          onClose={closeConfirmationDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirmar eliminación
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`¿Estás seguro de que deseas eliminar al empleado "${
                employeeToDelete ? employeeToDelete.name : ""
              }"?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeConfirmationDialog} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => handleDelete(employeeToDelete)}
              color="primary"
              autoFocus
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <MuiAlert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Empleado eliminado exitosamente
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  );
}

export default DashboardAdminEmployee;
