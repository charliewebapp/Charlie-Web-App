import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DashboardSuperAadmins from "../DashboardSuperA/DashboardSuperAadmins";
import DashboardSuperAclubs from "../DashboardSuperA/DashboardSuperAclubs";
import { setClubID } from "../../../redux/actions";
import style from "./dashboard.module.css";
import logotype from "../../../assets/img/charlielogo.png";
import imgCharlie from "../../../assets/img/charlie.png";
import { RiLogoutBoxLine } from "react-icons/ri";
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
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.aside}>
          <img src={logotype} className={style.asideLogo} />
          <div className={style.logotype}>
            <img src={logotype} className={style.logo} />
            CHARLIE
          </div>
          <div className={style.buttones}>
            <button className={style.button} onClick={handleClubs}>
              BOLICHES
            </button>
          </div>
          <div className={style.config}>
            <button className={style.btnCfg}>
              <RiLogoutBoxLine />
              Cerrar sesion
            </button>
          </div>
        </div>
        <div className={style.views}>
          <div className={style.navbar}>
            <h1 className={style.h1}>DASHBOARD SUPER ADMIN</h1>
          </div>
          <div className={style.dashboard}>
            {
              <div>
                {admins && <DashboardSuperAadmins />}
                {clubs && <DashboardSuperAclubs handleAdmins={handleAdmins} />}
                {!admins && !clubs && <h1>Seleccione sección</h1>}
              </div>
            }
            <img src={imgCharlie} className={style.imgCharlie}></img>
          </div>

          <div className={style.footer}>© Charlie</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
