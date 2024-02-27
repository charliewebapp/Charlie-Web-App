import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getSales } from "../../../redux/actions";

function DashboardAdminSales() {
  const clubName = JSON.parse((localStorage.getItem("clientName")));
  const allBoliches = useSelector((state) => state.allBoliches);
  const allSales = useSelector((state) => state.allSales);
  const [sortedSales, setSortedSales] = useState([]);

  const actualClient =JSON.parse((localStorage.getItem("clientName")));
  const clientId = localStorage.getItem("clientId");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSales(clubName, clientId));
  }, []);

  useEffect(() => {
    const sorted = [...allSales].sort(
      (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
    );
    setSortedSales(sorted);
  }, [allSales]);

  const rows = allSales
    ? sortedSales.map((sale, index) => {
        const total = calculateTotal(sale.cart);
        return {
          id: index + 1,
          usuario: sale.UserId,
          fecha: formatFecha(sale.dateTime),
          IDMP: sale.paymentId,
          estado: renderStatus(sale.status),
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
    const formattedDate = `${date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} - ${date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
    return formattedDate;
  }

  function renderStatus(status) {
    switch (status) {
      case "approved":
        return "Aprobado";
      case "rejected":
        return "Rechazado";
      case "pending":
        return "Pendiente";
      default:
        return "Desconocido";
    }
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
