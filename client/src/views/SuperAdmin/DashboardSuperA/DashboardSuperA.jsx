import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DashboardSuperAadmins from "../DashboardSuperA/DashboardSuperAadmins";
import DashboardSuperAclubs from "../DashboardSuperA/DashboardSuperAclubs";
import { setClubID } from "../../../redux/actions";
import style from "./dashboardSuperA.module.css";
import { FaArrowLeft } from "react-icons/fa";

function DashboardAdmin() {
  const [clubs, setClubs] = useState(true);
  const [admins, setAdmins] = useState(false);

  const dispatch = useDispatch();

  const handleClubs = () => {
    setAdmins(false);
    setClubs(true);
  };
  const handleAdmins = (row) => {
    const clubID = row.id;
    console.log("clubID", clubID);
    dispatch(setClubID(clubID));
    setClubs(false);
    setAdmins(true);
  };

  return (
    <>
      <div className={style.container}>
        <h1 className={style.h1}> Dashboard Super Administrador</h1>

        <div>
          <button className={style.button} onClick={handleClubs}>
            <h2 className={style.clubs}>Clubs</h2>
          </button>
        </div>

        {/* Renderizar condicionalmente segun el boton elegio */}
        <div>
          {admins && <DashboardSuperAadmins />}
          {clubs && <DashboardSuperAclubs handleAdmins={handleAdmins} />}
          {!admins && !clubs && <h1>Seleccione sección</h1>}
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;
