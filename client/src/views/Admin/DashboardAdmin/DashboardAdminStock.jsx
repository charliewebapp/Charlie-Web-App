// import * as React from "react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProducts, deleteProduct } from "../../../redux/actions";
// import { useParams } from "react-router-dom";
// import { useNavigate, Link } from "react-router-dom";
// import { DataGrid } from "@mui/x-data-grid";
// import Swal from "sweetalert2";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import style from "./dashboardAdmin.module.css";

// function DashboardAdminStock() {
//   const dispatch = useDispatch();
//   const clubName = useSelector((state) => state.selectClientAdmin);

//   const [productToDelete, setProductToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(getProducts(clubName));
//   }, []);

//   const allProductsState = useSelector((state) => state.allProducts);

//   const rows = allProductsState
//     ? allProductsState.map((prod) => {
//         return {
//           id: prod.id,
//           name: prod.name.toUpperCase(),
//           brand: prod.brand.toUpperCase(),
//           description: prod.description,
//           price: prod.price,
//           stock: prod.stock,
//           category: prod.category,
//         };
//       })
//     : [];

//   const columns = [
//     { field: "name", headerName: "Nombre", width: 150 },
//     { field: "brand", headerName: "Marca", width: 150 },
//     { field: "description", headerName: "Descripción", width: 280 },
//     { field: "price", headerName: "Precio", width: 100 },
//     { field: "stock", headerName: "Stock", width: 100 },
//     { field: "category", headerName: "Categoría", width: 120 },
//     {
//       field: "actions",
//       headerName: "Acciones",
//       width: 200,
//       renderCell: (params) => (
//         <div>
//           <Link to={`/admin/${clubName}/editproduct/${params.row.id}`}>
//             <button
//               className={style.buttonGrid}
//               onClick={() => handleEdit(params.row)}
//             >
//               Editar
//             </button>
//           </Link>

//           <button
//             className={style.buttonGrid}
//             onClick={() => openConfirmationDialog(params.row)}
//           >
//             Eliminar
//           </button>
//         </div>
//       ),
//     },
//   ];

//   function handleEdit(row) {
//     console.log("Editar:", row);
//   }

//   function openConfirmationDialog(product) {
//     setProductToDelete(product);
//     Swal.fire({
//       title: "¿Estás seguro?",
//       text: `¿Quieres eliminar el producto "${product.name}"?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "rgb(187, 131, 43)",
//       cancelButtonColor: "rgba(221, 51, 51, 0.9)",
//       confirmButtonText: "Sí, eliminar",
//       cancelButtonText: "No, cancelar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         handleDelete(product);
//       }
//     });
//   }

//   function handleDelete(product) {
//     try {
//       dispatch(deleteProduct(product.id, clubName));
//       Swal.fire({
//         title: "Éxito",
//         text: "El producto se eliminó correctamente",
//         icon: "success",
//         timer: "3000",
//         confirmButtonColor: "rgb(187, 131, 43)",
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   function handleAddStock() {
//     console.log("Agregar");
//   }

//   return (
//     <>
//       <div className={style.container}>
//         <h2>Stock</h2>

//         <div className={style.linkContainer}>
//           <Link
//             to={`/admin/${clubName}/addproduct`}
//             className={style.linkContainer}
//           >
//             <button className={style.buttonConfig} onClick={handleAddStock}>
//               Agregar Producto
//             </button>
//           </Link>
//         </div>
//         <div className={style.DataGrid}>
//           <DataGrid rows={rows} columns={columns} autoWidth />
//         </div>
//       </div>
//     </>
//   );
// }

// export default DashboardAdminStock;

import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";

function DashboardAdminStock() {
  const dispatch = useDispatch();
  const clubName = useSelector((state) => state.selectClientAdmin);

  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    dispatch(getProducts(clubName));
  }, []);

  const allProductsState = useSelector((state) => state.allProducts);

  const rows = allProductsState
    ? allProductsState.map((prod) => {
        return {
          id: prod.id,
          name: prod.name.toUpperCase(),
          brand: prod.brand.toUpperCase(),
          description: prod.description,
          price: prod.price,
          stock: prod.stock,
          category: prod.category,
        };
      })
    : [];

  const columns = [
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "description", headerName: "Descripción", width: 220 },
    { field: "price", headerName: "Precio", width: 100 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "category", headerName: "Categoría", width: 120 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <div>
          <Link to={`/admin/${clubName}/editproduct/${params.row.id}`}>
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

  function handleEdit(row) {
    console.log("Editar:", row);
  }

  function openConfirmationDialog(product) {
    setProductToDelete(product);
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar el producto "${product.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(187, 131, 43)",
      cancelButtonColor: "rgba(221, 51, 51, 0.9)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(product);
      }
    });
  }

  function handleDelete(product) {
    try {
      dispatch(deleteProduct(product.id, clubName));
      Swal.fire({
        title: "Éxito",
        text: "El producto se eliminó correctamente",
        icon: "success",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleAddStock() {
    console.log("Agregar");
  }

  return (
    <div className={style.linkContainer}>
      <h2>STOCK</h2>

      <div className={style.DataGrid}>
        <DataGrid rows={rows} columns={columns} autoPageSize rowHeight={40} />
      </div>

      <div className={style.linkContainer}>
        <Link
          to={`/admin/${clubName}/addproduct`}
          className={style.linkContainer}
        >
          <button className={style.btnCreate} onClick={handleAddStock}>
            AGREGAR PRODUCTO
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardAdminStock;
