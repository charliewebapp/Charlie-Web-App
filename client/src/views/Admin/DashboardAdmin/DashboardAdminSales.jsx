import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getSales } from "../../../redux/actions";

function DashboardAdminSales() {
  console.log("estoy en dashboard sales");

  const clubName = useSelector((state) => state.selectClientAdmin);
  const allBoliches = useSelector((state) => state.allBoliches);
  const allSales = useSelector((state) => state.allSales);

  console.log("all boliches", allBoliches);

  const actualClient = allBoliches.find((boliche) => boliche.name === clubName);
  const clientId = actualClient.id; //* Para enviar al reducer

  console.log("clientId", clientId);
  console.log("all sales", allSales);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSales(clubName, clientId));
  }, []);

  const rows = allSales
    ? allSales.map((sale, index) => {
        const total = calculateTotal(sale.cart);
        return {
          id: index + 1,
          usuario: sale.UserId,
          fecha: formatFecha(sale.dateTime),
          IDMP: sale.paymentId,
          estado: sale.status,
          cart: sale.cart,
          total: total,
        };
      })
    : [];

  const [selectedSale, setSelectedSale] = useState(null);

  const handleDetail = (row) => {
    setSelectedSale(row);
  };

  const columns = [
    // { field: "usuario", headerName: "Usuario", width: 225 },
    { field: "fecha", headerName: "Fecha", width: 200 },
    { field: "IDMP", headerName: "ID MercadoPago", width: 200 },
    { field: "estado", headerName: "Estado", width: 150 },
    {
      field: "total",
      headerName: "Total",
      width: 150,
      renderCell: (params) => <div>$ {params.value}</div>,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <div>
          <button
            className={style.acciones}
            onClick={() => handleDetail(params.row)}
          >
            Ver detalle
          </button>
        </div>
      ),
    },
  ];

  function calculateTotal(cart) {
    let total = 0;
    cart.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  }

  function formatFecha(fecha) {
    const date = new Date(fecha);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString("es-ES", options);
  }

  return (
    <>
      <div className={style.linkContainer}>
        <h2>VENTAS</h2>
        <div className={style.DataGrid}>
          <DataGrid rows={rows} columns={columns} autoPageSize rowHeight={40} />
        </div>
        {selectedSale && (
          <div className={style.Detail}>
            <h3 className={style.h3}>Detalle de la venta</h3>
            <ul className={style.ul}>
              {selectedSale.cart.map((product) => (
                <li
                  className={style.li}
                  key={product.id}
                  style={{ marginBottom: "10px" }}
                >
                  {" "}
                  {/* Agrega un margen inferior */}
                  {product.name}
                  <div>
                    <p className={style.p}>
                      Cantidad {product.quantity} - Precio unitario $
                      {product.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className={style.total}>
              Total: ${calculateTotal(selectedSale.cart)}
            </p>

            <button
              className={style.buttonClose}
              onClick={() => setSelectedSale(null)}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default DashboardAdminSales;
