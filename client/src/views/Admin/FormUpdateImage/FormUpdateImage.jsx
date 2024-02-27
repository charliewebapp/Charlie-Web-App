import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putImage, selectClientImage } from "../../../redux/actions";
import Swal from "sweetalert2";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
import { FaFileImage } from "react-icons/fa";
const FormUpdateImage = () => {
  const dispatch = useDispatch();
  const logo = useSelector((state) => state.selectClientImage);

  const [image, setImage] = useState(null);

  const clubName = JSON.parse(localStorage.getItem("clientName"));
  const imageBoliche = localStorage.getItem("bolicheimagen");

  const sendFormData = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      dispatch(putImage(clubName, formData));
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Error al actualizar la imagen",
      });
    }
  };

  console.log(imageBoliche, "imageBoliche");

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendFormData();
      localStorage.setItem("bolicheimagen", JSON.stringify(imageBoliche));
      Swal.fire({
        icon: "warning",
        title: "Advertencia!",
        text: "Debe loguearse nuevamente para ver los cambios",
      });
    } catch (error) {
      console.error("Error during form submission:", error);
    }
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
};

  return (
    <div className={style.changeImage}>
      <h2 className={style.h2}>Cambiar logo del boliche</h2>
      <div className={style.divImg}>
        <img src={logo} alt="logo-boliche" className={style.logoBoliche} />
      </div>

      <form onSubmit={handlerSubmit} encType="multipart/form-data">
        <label style={buttonStyle}>
          <FaFileImage /> Cambiar tu logo
          <input
            type="file"
            onChange={handleImageChange}
            style={fileInputStyle}
            className={style.buttonStyle}
            enctype="multipart/form-data"
          />
        </label>

        <button className={style.btnForms} type="submit">
          Actualizar logo
        </button>
      </form>
    </div>
  );
};

export default FormUpdateImage;
