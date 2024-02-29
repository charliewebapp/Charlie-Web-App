import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleCollaboratorStatusLogout } from "../../redux/actions";
import style from "../SuperAdmin/DashboardSuperA/dashboard.module.css";
import Swal from "sweetalert2";
import qrlogo from "../../assets/img/qr-colaborador.png";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
const ColaboradorNavbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: "Atencion!",
      text: "estas seguro que deseas cerrar sesion?",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "confirmar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        localStorage.clear()
        dispatch(handleCollaboratorStatusLogout());
        return Promise.resolve();
      },
    });
  };

  return (
    <nav className={style.navColaborador}>
      <div className={style.colaboradorTitle}>
        <h2>COLABORADOR</h2>
      </div>

      <div className={style.nav}>
        <ul>
          <li>
            <Link to="/colaborador/perfil" className={style.a}>
              <div className={style.btnC}>
                <CgProfile />
                <p>Profile</p>
              </div>
            </Link>
          </li>
          <li className={style.qrButton}>
            <Link to="/colaborador/qr" className={style.a}>
              <img src={qrlogo} alt="qr" className={style.qrImg} />
            </Link>
          </li>
          <li className={style.a}>
            <button onClick={handleLogout} className={style.btnC}>
              <TbLogout />
              <p>Logout</p>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ColaboradorNavbar;
