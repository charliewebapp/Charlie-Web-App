import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBoliches } from "../../../redux/actions";
import style from "./dashboardSuperA.module.css";

function DashboardSuperAclubs() {

    const dispatch = useDispatch();

    const allBolichesState = useSelector((state) => state.allBoliches);
    console.log("todos los boliches", allBolichesState);

    useEffect(() => {
        dispatch(getBoliches());
    }, []);

    const rows = allBolichesState.map((club) => {
        return {
            id: club.id,
            name: club.name,
            ciudad: club.city,
            direccion: club.adress,
            status: club.status,
        };
    });

    const columns = [
        { field: "name", headerName: "Nombre", width: 250 },
        { field: "ciudad", headerName: "Ciudad", width: 250 },
        { field: "direccion", headerName: "Direccion", width: 250 },
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
                <h2>Clubs</h2>
                <div className={style.DataGrid}>
                    <DataGrid rows={rows} columns={columns} autoWidth />
                </div>
            </div>
        </>
    );
}

export default DashboardSuperAclubs;