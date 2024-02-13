import React, { useState } from "react";
import { postBoliche } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import style from "../../SuperAdmin/SAForms.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function FormPostClubSuperA() {
  const navigate = useNavigate();
  const [create, setCreate] = useState({
    name: "",
    image: null, // Inicializado como null
    adress: "",
    city: "",
  });

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

      await dispatch(postBoliche(createBoliche, navigate));

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
    sendFormData(create);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreate({ ...create, [name]: value });
  };

  return (
    <div className={style.formContainer}>
      <div>
        <h1>Crear boliche</h1>
        <Link to={`/superadmin/dashboard`}>
          <button type="button">Volver </button>
        </Link>
      </div>
      <form onSubmit={handlerSubmit}>
        <label htmlFor="name">Nombre del boliche</label>
        <input
          type="text"
          name="name"
          value={create.name}
          onChange={handleInputChange}
        />

        <input type="file" onChange={handleImageChange} />

        <label htmlFor="adress">Direccion</label>
        <input
          type="text"
          name="adress"
          value={create.adress}
          onChange={handleInputChange}
        />

        <label htmlFor="city">Ciudad</label>
        <input
          type="text"
          name="city"
          value={create.city}
          onChange={handleInputChange}
        />

        <button type="submit">CREAR</button>
      </form>
    </div>
  );
}

export default FormPostClubSuperA;
