import React, { useState } from "react";
import { validateFormEmployeeAdmin } from "../../../utils/validateFormEmployeeAdmin";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postCollaborator } from "../../../redux/actions";
import Swal from "sweetalert2";
import logotype from "../../../assets/img/charlielogo.png";
import imgCharlie from "../../../assets/img/charlie.png";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
function FormPostEmployee() {
  const dispatch = useDispatch();
  const clubName = JSON.parse((localStorage.getItem("clientName")));
  // trae los collabs de todos los boliches
  const collaboratorsState = useSelector(state => state.collaborators)

  //local state for input
  const [collaboratorData, setCollaboratorData] = useState({
    name: "",
    lastname: "",
    password: "",
    mail: "",
    status: "",
  });

  //local state errors
  const [errors, setErrors] = useState({
    name: "*",
    lastname: "*",
    password: "*",
    mail: "*",
    status: "*",
  });

  //onChange inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setCollaboratorData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setErrors(validateFormEmployeeAdmin(updatedData));

      //No repita emails
      const repetedEmail = collaboratorsState.find(
        (collab) =>
          collab.mail.toLowerCase() === updatedData.mail.toLowerCase()
      );
      if (repetedEmail !== undefined) {
        setErrors({ ...errors, mail: "Este email ya está registrado" });
      }

      return updatedData;
    });
  };

  //! SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(postCollaborator(collaboratorData, clubName));
      setCollaboratorData({
        name: "",
        lastname: "",
        password: "",
        mail: "",
        status: "",
      });

      Swal.fire({
        title: "Éxito",
        text: "El colaborador se agregó correctamente",
        icon: "success",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    } catch (error) {
      //El sweet de error viene de actions
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
            <Link to={`/admin/${clubName}/dashboardAdmin`}>
              <button className={style.button}>
                <FaArrowLeft />
              </button>
            </Link>
          </div>
        </div>
        <div className={style.views}>
          <div className={style.navbar}>
            <h1 className={style.h1}>DASHBOARD ADMIN</h1>
          </div>
          <div className={style.dashboard}>
            <h2>CREAR COLABORADOR</h2>

            <form className={style.FormPostAdminSA} onSubmit={handleSubmit}>
              <label htmlFor="name">Nombre: </label>
              <input
                type="text"
                id="name"
                key="name"
                name="name"
                value={collaboratorData.name}
                onChange={handleChange}
              />
              <span>{errors.name ? errors.name : null} </span>

              <label htmlFor="lastname"> Apellido: </label>
              <input
                type="text"
                id="lastname"
                key="lastname"
                name="lastname"
                value={collaboratorData.lastname}
                onChange={handleChange}
              />
              <span>{errors.lastname ? errors.lastname : null} </span>

              <label htmlFor="password"> Password: </label>
              <input
                type="text"
                id="password"
                key="password"
                name="password"
                value={collaboratorData.password}
                onChange={handleChange}
              />
              <span>{errors.password ? errors.password : null} </span>

              <label htmlFor="mail"> E-mail: </label>
              <input
                type="text"
                id="mail"
                key="mail"
                name="mail"
                value={collaboratorData.mail}
                onChange={handleChange}
              />
              <span>{errors.mail ? errors.mail : null} </span>

              <label htmlFor="status"> Estado: </label>
              <select
                name="status"
                id="status"
                onChange={handleChange}
                value={collaboratorData.status}
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
                AGREGAR COLABORADOR
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

export default FormPostEmployee;

{
  /* <div className={style.formContainer}>
<div>
  <h2>Agregar Nuevo Colaborador</h2>

  <Link to={`/admin/${clubName}/dashboardAdmin`}>
    <button>Volver </button>
  </Link>
</div>

<form className={style.container} onSubmit={handleSubmit}>
  <label htmlFor="name">Nombre: </label>
  <input
    type="text"
    id="name"
    key="name"
    name="name"
    value={collaboratorData.name}
    onChange={handleChange}
  />
  <p>{errors.name ? errors.name : null} </p>

  <label htmlFor="lastname"> Apellido: </label>
  <input
    type="text"
    id="lastname"
    key="lastname"
    name="lastname"
    value={collaboratorData.lastname}
    onChange={handleChange}
  />
  <p>{errors.lastname ? errors.lastname : null} </p>

  <label htmlFor="password"> Password: </label>
  <input
    type="text"
    id="password"
    key="password"
    name="password"
    value={collaboratorData.password}
    onChange={handleChange}
  />
  <p>{errors.password ? errors.password : null} </p>

  <label htmlFor="mail"> E-mail: </label>
  <input
    type="text"
    id="mail"
    key="mail"
    name="mail"
    value={collaboratorData.mail}
    onChange={handleChange}
  />
  <p>{errors.mail ? errors.mail : null} </p>

  <label htmlFor="status"> Estado: </label>
  <select
    name="status"
    id="status"
    onChange={handleChange}
    value={collaboratorData.status}
  >
    <option value="" disabled hidden>
      Seleccione el estado:
    </option>
    <option value="active"> ACTIVO </option>
    <option value="inactive"> INACTIVO </option>
  </select>
  <p> {errors.status ? errors.status : null} </p>

  <button
    type="submit"
    disabled={Object.values(errors).some(
      (error) => error && error.length > 0
    )}
  >
    {" "}
    AGREGAR COLABORADOR
  </button>
</form>
</div> */
}
