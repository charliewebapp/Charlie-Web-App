import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAdministrators, getBoliches } from "../../../redux/actions";
import { validateFormAdmin } from "../../../utils/validateFormUpdateAdmin";
import { updateAdmin } from "../../../redux/actions";
import Swal from "sweetalert2";
import style from "../DashboardSuperA/dashboard.module.css";
import logotype from "../../../assets/img/charlielogo.png";
import imgCharlie from "../../../assets/img/charlie.png";
import { RiLogoutBoxLine } from "react-icons/ri";

function FormUpdateAdmin() {
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState({});
  const navigate = useNavigate();

  const allAdmins = useSelector((state) => state.allAdministrators);
  const allBoliches = useSelector((state) => state.allBoliches);
  // console.log(allBoliches, "allBoliches");
  const { idAdmin } = useParams();

  const adminToUpdate = allAdmins.find((admin) => admin.id === idAdmin);
  // console.log(adminToUpdate, "adminToUpdate");
  const adminsNOTToUpdate = allAdmins.filter((admin) => admin.id !== idAdmin);

  useEffect(() => {
    dispatch(getAdministrators());
    dispatch(getBoliches());
  }, []);

  useEffect(() => {
    if (adminToUpdate) {
      setAdminData({
        id: adminToUpdate.id,
        name_client: adminToUpdate.name_client,
        password: adminToUpdate.password,
        mail: adminToUpdate.mail,
        status: adminToUpdate.status,
      });
    }
  }, [adminToUpdate]);

  const club = allBoliches.find((club) => club.id === adminToUpdate.ClientId);
  const clubName = club.name;
  // console.log(club, "club");
  // console.log(clubName, "clubName");

  const [errors, setErrors] = useState({
    name_client: "*",
    password: "*",
    mail: "*",
    status: "*",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAdminData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setErrors(validateFormAdmin(updatedData));

      //No repita emails 
      const repetedEmail = adminsNOTToUpdate.find(
        (admin) =>
          admin.mail.toLowerCase() === updatedData.mail.toLowerCase()
      );
      if (repetedEmail !== undefined) {
        setErrors({ ...errors, mail: "Este email ya está registrado" });
      }

      return updatedData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(updateAdmin(adminData, idAdmin, clubName));
      setAdminData({
        name_client: "",
        password: "",
        mail: "",
        status: "",
      });
      Swal.fire({
        title: "Éxito",
        text: "El administrador se editó correctamente",
        icon: "success",
        timer: "3000",
        didClose: () => {
          navigate("/superadmin/dashboard");
        },
      });
    } catch (error) {
      console.log(error.message);
    }
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
            <Link to={`/superadmin/dashboard`}>
              <button className={style.button}>BOLICHES</button>
            </Link>
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
            <h2>EDITAR ADMINISTRADOR</h2>

            <form onSubmit={handleSubmit} className={style.FormPostAdminSA}>
              <label htmlFor="name_client">Nombre: </label>
              <input
                type="text"
                id="name_client"
                key="name_client"
                name="name_client"
                value={adminData.name_client}
                onChange={handleChange}
              />
              <span>{errors.name_client ? errors.name_client : null} </span>

              {/* <label htmlFor="password"> Password: </label>
              <input
                type="text"
                id="password"
                key="password"
                name="password"
                value={adminData.password}
                onChange={handleChange}
              />
              <span>{errors.password ? errors.password : null} </span> */}

              <label htmlFor="mail"> E-mail: </label>
              <input
                type="text"
                id="mail"
                key="mail"
                name="mail"
                value={adminData.mail}
                onChange={handleChange}
              />
              <span>{errors.mail ? errors.mail : null} </span>

              <label htmlFor="status"> Estado: </label>
              <select
                name="status"
                id="status"
                onChange={handleChange}
                value={adminData.status}
              >
                <option value="" disabled hidden>
                  Seleccione el estado:
                </option>
                <option value="active"> ACTIVO </option>
                <option value="inactive"> INACTIVO </option>
              </select>
              <span> {errors.status ? errors.status : null} </span>

              <button
                className={style.btnForms}
                type="submit"
                disabled={Object.values(errors).some(
                  (error) => error && error.length > 0
                )}
              >
                EDITAR ADMIN
              </button>
            </form>

            <img src={imgCharlie} className={style.imgCharlie}></img>
          </div>

          <div className={style.footer}>© Charlie</div>
        </div>
      </div>
    </div>
  );
}

export default FormUpdateAdmin;
