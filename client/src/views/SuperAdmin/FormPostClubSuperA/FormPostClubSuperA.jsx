import React, { useState } from "react";
import { postBoliche } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./formpostclubsupera.module.css";
import { useNavigate } from "react-router-dom";

function FormPostClubSuperA() {
  const navigate = useNavigate()
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

      dispatch(postBoliche(createBoliche,navigate));
    } catch (error) {
      console.error(error)
      alert ("Error al crear el boliche: "+ error);
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
    <React.Fragment>
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          name="name"
          value={create.name}
          onChange={handleInputChange}
          placeholder="Nombre del boliche"
        />

        <input type="file" onChange={handleImageChange} />

        <input
          type="text"
          name="adress"
          value={create.adress}
          onChange={handleInputChange}
          placeholder="Direccion"
        />

        <input
          type="text"
          name="city"
          value={create.city}
          onChange={handleInputChange}
          placeholder="Ciudad"
        />

        <button type="submit">CREAR</button>
      </form>
    </React.Fragment>
  );
}

export default FormPostClubSuperA;
