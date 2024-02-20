import React, { useState } from "react";
import { validateFormEmployeeAdmin } from "../../../utils/validateFormEmployeeAdmin";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updateCollaborator } from "../../../redux/actions";
import Swal from "sweetalert2";
import logotype from "../../../assets/img/charlielogo.png";
import imgCharlie from "../../../assets/img/charlie.png";
import { FaArrowLeft } from "react-icons/fa";
function FormUpdateEmployee() {
  const dispatch = useDispatch();
  const clubName = useSelector((state) => state.selectClientAdmin);

  // CON ESTADO GOBAL REDUX
  const allCollaboratorsState = useSelector((state) => state.allCollaborators);
  const { idCollaborator } = useParams();

  const collaboratorToUpdate = allCollaboratorsState.find(
    (collaborator) => collaborator.id === idCollaborator
  );
  const [collaboratorData, setCollaboratorData] = useState({
    name: collaboratorToUpdate.name,
    lastname: collaboratorToUpdate.lastname,
    password: collaboratorToUpdate.password,
    mail: collaboratorToUpdate.mail,
    status: collaboratorToUpdate.status,
  });

  //local state errors
  const [errors, setErrors] = useState({
    name: "Ingrese el nombre",
    lastname: "Ingrese el apellido",
    password: "Asigne una contraseña",
    mail: "Ingrese el email",
    status: "Ingrese el estado",
  });

  //onChange inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setCollaboratorData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setErrors(validateFormEmployeeAdmin(updatedData));

      return updatedData;
    });
  };

  //! SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(updateCollaborator(collaboratorData, idCollaborator, clubName));
      setCollaboratorData({
        name: "",
        lastname: "",
        password: "",
        mail: "",
        status: "",
      });
      Swal.fire({
        title: "Éxito",
        text: "El colaborador se editó correctamente",
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
            <Link to={`/admin/test/dashboardAdmin`}>
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
            <h2>EDITAR COLABORADOR</h2>

            <form onSubmit={handleSubmit} className={style.FormPostAdminSA}>
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
                {" "}
                EDITAR COLABORADOR
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

export default FormUpdateEmployee;
