////////////////form

import React, { useState } from "react";
import { postBoliche } from "../../../redux/actions";
import { useDispatch } from "react-redux";
// import style from "./formpostclubsupera.module.css";

function FormPostClubSuperA() {
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

      dispatch(postBoliche(createBoliche));

      console.log(createBoliche, "ACA");
      alert("Boliche creado con éxito");
    } catch (error) {
      console.error(error);
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente
    sendFormData(create);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreate({ ...create, [name]: value });
  };

  // const handleImageChange = (e) => {
  //   const selectedImage = e.target.files[0];
  //   setCreate({ ...create, image: selectedImage });
  // };

  // const handleImageChange = (e) => {
  //   // setCreate({ ...create, image: e.target.files[0] });
  //   const formData = new FormData();
  //   formData.append("file", e.target.files[0]);

  //   console.log(e.target.files[0], "Soy la imagen");

  //   return formData;
  // };

  // const onFileChange = (e) =>{
  //   setCreate({
  //     ...create, [image]:
  //   })
  // }

  return (
    <div>
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
    </div>
  );
}

export default FormPostClubSuperA;
