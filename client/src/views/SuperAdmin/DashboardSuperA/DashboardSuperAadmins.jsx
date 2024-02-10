import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAdministrators } from "../../../redux/actions";
import style from "./dashboardSuperA.module.css";
import { Link } from "react-router-dom";


function DashboardSuperAadmins() {

    const dispatch = useDispatch();

    const allAdministratorsState = useSelector((state) => state.allAdministrators);
    console.log("todos los administradores", allAdministratorsState);

    useEffect(() => {
        dispatch(getAdministrators());
    }, []);

    const rows = allAdministratorsState.map((admin) => {
        return {
            id: admin.id,
            name: admin.name_client,
            mail: admin.mail,
            club: admin.ClientId,
            status: admin.status,
        };
    });

    const columns = [
        { field: "name", headerName: "Nombre", width: 250 },
        { field: "mail", headerName: "Email", width: 250 },
        { field: "club", headerName: "Club", width: 250 },
        { field: "status", headerName: "Status", width: 250 },
        {
            field: "actions",
            headerName: "Acciones",
            width: 250,
            renderCell: (params) => (
                <div>
                    <button className={style.button} onClick={() => handleEdit(params.row)}>
                        Editar
                    </button>
                    <button
                        className={style.button}
                        onClick={() => handleDelete(params.row)}
                    >
                        Eliminar
                    </button>
                    <button
                        className={style.button}
                        onClick={() => handleBlock(params.row)}
                    >
                        Bloquear
                    </button>
                </div>
            ),
        },
    ];

    function handleEdit(row) {
        console.log("Editar:", row);
        // Aquí puedes implementar la lógica para editar la fila
    }

    function handleDelete(row) {
        console.log("Eliminar:", row);
        // Aquí puedes implementar la lógica para eliminar la fila
    }

    function handleBlock(row) {
        console.log("Eliminar:", row);
        // Aquí puedes implementar la lógica para eliminar la fila
    }

    return (
        <>
            <div className={style.container}>
                <h2>Admins</h2>
                <br />
                <button className={style.button}>
                    <Link to="/superadmin/addadmin">Crear Nuevo Admin</Link>
                </button>
                <div className={style.DataGrid}>
                    <DataGrid rows={rows} columns={columns} autoWidth />
                </div>
            </div>
        </>
    );
}

export default DashboardSuperAadmins;
