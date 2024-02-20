import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../DashboardSuperA/dashboard.module.css";
import { postAdmin, getBoliches } from "../../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validateFormPostAdmin } from "../../../utils/validateFormPostAdmin";
import logotype from "../../../assets/img/charlielogo.png";
import imgCharlie from "../../../assets/img/charlie.png";
import { RiLogoutBoxLine } from "react-icons/ri";

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

  const [errors, setErrors] = useState({});

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

    const validationErrors = validateFormPostAdmin({
      ...createAdmin,
      [name]: value,
    });
    setErrors(validationErrors);

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
    const validationErrors = validateFormPostAdmin(createAdmin); // Validate the form data

    if (Object.keys(validationErrors).length === 0) {
      // If there are no errors
      sendFormData(createAdmin);
    }
  };

  console.log(errors, "errors");

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
            <h2>CREAR ADMINISTRADOR</h2>

            <form onSubmit={handlerSubmit} className={style.FormPostAdminSA}>
              <label htmlFor="name_client">Nombre del administrador</label>
              <input
                type="text"
                name="name_client"
                value={createAdmin.name_client}
                onChange={handleInputChange}
              />

              <span className={style.error}>
                {errors.name_client ? errors.name_client : null}
              </span>

              <label htmlFor="mail">Correo del admistrador</label>
              <input
                type="email"
                name="mail"
                placeholder=""
                value={createAdmin.mail}
                onChange={handleInputChange}
              />

              <span className={style.error}>
                {errors.mail ? errors.mail : null}
              </span>

              <label htmlFor="password">Contraseña del administrador</label>
              <input
                type="password"
                name="password"
                value={createAdmin.password}
                onChange={handleInputChange}
              />

              <span className={style.error}>
                {errors.password ? errors.password : null}
              </span>

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

export default FormPostAdminSA;
