import * as React from "react";
import { useState } from "react";
import DashboardSuperAadmins from "../DashboardSuperA/DashboardSuperAadmins"
import DashboardSuperAclubs from "../DashboardSuperA/DashboardSuperAclubs"
import style from "./dashboardSuperA.module.css";


function DashboardAdmin() {
    const [clubs, setClubs] = useState(true);
    const [admins, setAdmins] = useState(false);

    const handleClubs = () => {
        setAdmins(false);
        setClubs(true);

    };
    const handleAdmins = () => {
        setClubs(false);
        setAdmins(true);
    };

    return (
        <>
            <div className={style.container}>
                <h1> Dashboard Super Administrador</h1>

                <div>
                    <button className={style.button} onClick={handleAdmins}>
                        {" "}
                        Admins{" "}
                    </button>
                    <button className={style.button} onClick={handleClubs}>
                        {" "}
                        Clubs{" "}
                    </button>
                </div>

                {/* Renderizar condicionalmente segun el boton elegio */}
                <div>
                    {admins && <DashboardSuperAadmins />}
                    {clubs && <DashboardSuperAclubs />}
                    {!admins && !clubs && <h1>Seleccione sección</h1>}
                </div>
            </div>
        </>
    );
}

export default DashboardAdmin;
