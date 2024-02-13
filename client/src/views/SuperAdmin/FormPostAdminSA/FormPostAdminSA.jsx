import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../../SuperAdmin/SAForms.module.css";
import { postAdmin, getBoliches } from "../../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

  const handleSelectChange = (event) => {
    setClientId(event.target.value);

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
      await dispatch(postAdmin(createForm, params, navigate));

      Swal.fire({
        icon: "success",
        title: "¡Administrador creado con éxito!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡No se pudo crear el administrador!",
      });
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    sendFormData(createAdmin);
  };
  return (
    <div className={style.formContainer}>
      <div>
        <h1>Crear administrador</h1>
        <Link to={`/superadmin/dashboard`}>
          <button type="button">Volver </button>
        </Link>
      </div>

      <form onSubmit={handlerSubmit}>
        <label htmlFor="name_client">Nombre del administrador</label>
        <input
          type="text"
          name="name_client"
          value={createAdmin.name_client}
          onChange={handleInputChange}
        />

        <label htmlFor="mail">Mail del administrador</label>
        <input
          type="email"
          name="mail"
          placeholder=""
          value={createAdmin.mail}
          onChange={handleInputChange}
        />

        <label htmlFor="password">Contraseña del administrador</label>
        <input
          type="password"
          name="password"
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
    </div>
  );
}

export default FormPostAdminSA;
