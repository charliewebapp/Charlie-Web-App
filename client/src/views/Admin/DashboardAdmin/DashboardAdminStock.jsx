import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
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

function DashboardAdminStock() {
  const dispatch = useDispatch();
  const clubName = useSelector((state) => state.selectClientAdmin);

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(getProducts(clubName));
  }, []);

  const allProductsState = useSelector((state) => state.allProducts);
  console.log("todos los productos", allProductsState);

  const rows = allProductsState
    ? allProductsState.map((prod) => {
        return {
          id: prod.id,
          name: prod.name,
          brand: prod.brand,
          image: prod.image,
          description: prod.description,
          price: prod.price,
          stock: prod.stock,
          category: prod.category,
        };
      })
    : [];

  const columns = [
    { field: "name", headerName: "Nombre", width: 100 },
    { field: "brand", headerName: "Marca", width: 100 },
    { field: "image", headerName: "Imagen", width: 100 },
    { field: "description", headerName: "Descripción", width: 250 },
    { field: "price", headerName: "Precio", width: 80 },
    { field: "stock", headerName: "Stock", width: 80 },
    { field: "category", headerName: "Categoría", width: 100 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 250,
      renderCell: (params) => (
        <div>
          <Link to={`/admin/${clubName}/editproduct/${params.row.id}`}>
            <button
              className={style.button}
              onClick={() => handleEdit(params.row)}
            >
              Editar{" "}
            </button>
          </Link>

          <button
            className={style.button}
            onClick={() => openConfirmationDialog(params.row)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  function handleEdit(row) {
    console.log("Editar:", row);
  }

  function openConfirmationDialog(product) {
    setProductToDelete(product);
    setConfirmationDialogOpen(true);
  }

  function closeConfirmationDialog() {
    setConfirmationDialogOpen(false);
  }

  function handleDelete(product) {
    dispatch(deleteProduct(product.id, clubName)); // Pasar clubName como parámetro
    closeConfirmationDialog();
    setSnackbarOpen(true);
  }

  function handleAddStock() {
    console.log("Agregar");
    // Aquí puedes implementar la lógica para agregar stock
  }

  return (
    <>
      <div className={style.container}>
        <h2>Stock</h2>

        <Link to={`/admin/${clubName}/addproduct`}>
          <button className={style.button} onClick={handleAddStock}>
            {" "}
            Agregar Producto{" "}
          </button>
        </Link>
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
              {`¿Estás seguro de que deseas eliminar el producto "${
                productToDelete ? productToDelete.name : ""
              }"?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeConfirmationDialog} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => handleDelete(productToDelete)}
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
            Producto eliminado exitosamente
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  );
}

export default DashboardAdminStock;
