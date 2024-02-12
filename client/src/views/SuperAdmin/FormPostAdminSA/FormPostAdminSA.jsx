import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./formpostadminsa.module.css";
import { postAdmin, getBoliches } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";

function FormPostAdminSA() {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState("");
  const [selectedName, setSelectedName] = useState("");

  const dispatch = useDispatch();
  const boliches = useSelector((state) => state.boliches);

  const [createAdmin, setCreateAdmin] = useState({
    name_client: "",
    password: "",
    mail: "",
    ClientId: "",
  });

  useEffect(() => {
    dispatch(getBoliches());
  }, []);

  const [selectedBoliche, setSelectedBoliche] = useState({
    name: "",
  });

  // const handleChangeTwo = (e) => {
  //   const { name, value } = e.target;

  //   setSelectedBoliche((prevSelected) => ({
  //     ...prevSelected,
  //     [name]: value,
  //   }));
  // };

  const handleSelectChange = (event) => {
    // Actualiza clientId con el valor del select
    setClientId(event.target.value);
    // Actualiza selectedName con el nombre del boliche seleccionado
    const selectedOption =
      event.target.options[event.target.selectedIndex].innerText;
    console.log(selectedOption);
    setSelectedName(selectedOption);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateAdmin({ ...createAdmin, [name]: value });

    setSelectedBoliche(value);
  };

  const sendFormData = async () => {
    try {
      const createForm = {
        name_client: createAdmin.name_client,
        password: createAdmin.password,
        mail: createAdmin.mail,
        ClientId: clientId,
      };

      const params = selectedName;
      dispatch(postAdmin(createForm, params, navigate));
    } catch (error) {
      console.error(error);
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    sendFormData(createAdmin);
  };
  return (
    <React.Fragment>
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          name="name_client"
          value={createAdmin.name_client}
          placeholder="Nombre del administrador"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="mail"
          placeholder="Correo del administrador"
          value={createAdmin.mail}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña del administrador"
          value={createAdmin.password}
          onChange={handleInputChange}
        />
        <select onChange={handleSelectChange}>
          <option>Seleccionar boliche</option>
          {boliches.map((boliche) => (
            <option
              key={boliche.id}
              value={boliche.id}
              data-name={boliche.name}
            >
              {boliche.name}
            </option>
          ))}
        </select>

        <button type="submit">CREAR</button>
      </form>
    </React.Fragment>
  );
}

export default FormPostAdminSA;
