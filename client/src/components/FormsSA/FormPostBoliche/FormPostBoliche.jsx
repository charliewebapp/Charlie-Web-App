import React, { useState } from "react";
import style from "./formpostboliche.module.css";

function FormPostBoliche() {
  const [create, setCreated] = useState({
    name: "",
    adress: "",
    city: "",
  });

  return (
    <React.Fragment>
      <form>
        <label>Nombre</label>
        <input type="text"></input>
        <label>Ciudad</label>
        <input type="text"></input>
        <label>Direccion</label>
        <input type="text"></input>
      </form>
    </React.Fragment>
  );
}

export default FormPostBoliche;
