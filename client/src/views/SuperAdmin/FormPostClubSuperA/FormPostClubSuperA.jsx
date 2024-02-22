import React, { useState } from "react";
import { postBoliche } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import style from "../DashboardSuperA/dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validateFormPostClub } from "../../../utils/validateFormPostClub";
import logotype from "../../../assets/img/charlielogo.png";
import imgCharlie from "../../../assets/img/charlie.png";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaFileImage, FaReact } from "react-icons/fa"; // Importa el icono de React

function FormPostClubSuperA() {
  const navigate = useNavigate();
  const [create, setCreate] = useState({
    name: "",
    image: null, // Inicializado como null
    adress: "",
    city: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    setCreate({ ...create, image: e.target.files[0] });
  };

  const sendFormData = async () => {
    try {
      const createBoliche = new FormData();
      createBoliche.append("name", create.name);
      createBoliche.append("adress", create.adress);
      createBoliche.append("city", create.city);
      if (create.image) {
        createBoliche.append("image", create.image); // Append the file directly
      }

      dispatch(postBoliche(createBoliche, navigate));

      Swal.fire({
        icon: "success",
        title: "¡Boliche creado con éxito!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Error al crear el boliche!",
      });
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormPostClub(create); // Validate the form data
    if (Object.keys(validationErrors).length === 0) {
      // If there are no errors
      sendFormData(create);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreate({ ...create, [name]: value });

    const validationErrors = validateFormPostClub({ ...create, [name]: value });
    setErrors(validationErrors); // Set the errors state

    setCreate({ ...create, [name]: value });
  };
  const buttonStyle = {
    display: "flex",
    border: "1px solid #380036",
    width: "350px",
    height: "40px",
    margin: "10px 0 10px 0",
    padding: "0 10px",
    color: "#380036",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    alignItems: "center",
    justifyContent: "center",
  };

  // Estilos para el input
  const fileInputStyle = {
    display: "none", // Oculta el input
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
            <h2>CREAR BOLICHE</h2>

            <form onSubmit={handlerSubmit} className={style.FormPostAdminSA}>
              <label htmlFor="name">Nombre del boliche</label>
              <input
                type="text"
                name="name"
                value={create.name}
                onChange={handleInputChange}
              />

              <span>{errors.name ? errors.name : null} </span>

              {/* <input type="file" onChange={handleImageChange} /> */}
              <label style={buttonStyle}>
                <FaFileImage /> Agrega tu logo
                <input
                  type="file"
                  onChange={handleImageChange}
                  style={fileInputStyle}
                  className={style.buttonStyle}
                  enctype="multipart/form-data"
                />
              </label>

              <label htmlFor="adress">Direccion</label>
              <input
                type="text"
                name="adress"
                value={create.adress}
                onChange={handleInputChange}
              />

              <span>{errors.adress ? errors.adress : null} </span>

              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                name="city"
                value={create.city}
                onChange={handleInputChange}
              />

              <span>{errors.city ? errors.city : null} </span>

              <button
                className={style.btnForms}
                type="submit"
                disabled={Object.values(errors).some(
                  (error) => error && error.length > 0
                )}
              >
                CREAR
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
export default FormPostClubSuperA;
