import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, updateProduct } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import style from "./dashboardAdmin.module.css";

function DashboardAdminStock() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const allProductsState = useSelector((state) => state.allProducts);
  console.log("todos los productos", allProductsState);

  const rows = allProductsState.map((prod) => {
    return {
      id: prod.id,
      name: prod.name,
      brand: prod.brand,
      image: prod.image,
      description: prod.description,
      price: prod.price,
      stock: prod.stock,
      category: prod.category, //No se si asi, veremos
    };
  });

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
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
          <Link to={`/admin/testnati/editproduct/${params.row.id}`}>
            <button
              className={style.button}
              onClick={() => handleEdit(params.row)}
            >
              Editar{" "}
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

  function handleEdit(row) {
    console.log("Editar:", row);
  }

  function handleDelete(row) {
    console.log("Eliminar:", row);
    // Aquí puedes implementar la lógica para eliminar la fila
  }

  function handleAddStock() {
    console.log("Agregar");
    // Aquí puedes implementar la lógica para eliminar la fila
  }

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

export default DashboardAdminStock;
