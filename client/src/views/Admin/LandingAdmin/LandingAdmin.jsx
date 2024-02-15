import React from "react";
import style from "./landingAdmin.module.css";
import validation from "./validation";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectClientAdminName,
  handleAdminStatusLogin,
  getAdmins,
  getBoliches,
  adminIdLogged,
} from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPersonWalkingDashedLineArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function LandingAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAdmins());
    dispatch(getBoliches());
  }, [dispatch]);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors(
      validation({
        ...userData,
        [name]: value, //viene asi para q agarre en tiepo real todo. Si pongo solo userData, queda desfasado el ultimo caracter para validar.
      })
    );
  };

  const getAllAdmins = useSelector((state) => state.getAllAdmins);
  const allBoliches = useSelector((state) => state.allBoliches);
  const adminStatusLogin = useSelector((state) => state.adminStatusLogin);

  const loginAdmin = (userData) => {
    const adminLogin = getAllAdmins.find(
      (admin) =>
        admin.mail === userData.email && admin.password === userData.password
    );

    if (adminLogin) {
      const adminClient = adminLogin.ClientId;

      if (adminLogin.status === "active") {
        // Si el usuario está activo, realizar el inicio de sesión
        dispatch(handleAdminStatusLogin());
        dispatch(adminIdLogged(adminLogin));

        const clientFromADmin = allBoliches.find(
          (boliche) => boliche.id === adminClient
        );

        const client = clientFromADmin.name;
        dispatch(selectClientAdminName(client));
        navigate(`/admin/${client}/dashboardAdmin`);
      } else if (adminLogin.status === "inactive") {
        // Si el usuario está inactivo, mostrar alerta
        Swal.fire({
          title: "Acceso denegado",
          text: "Usuario inactivo temporalmente. Comuníquese con Charlie.ar.",
          imageUrl:
            "https://res.cloudinary.com/dzpqgjczu/image/upload/v1708029042/Dise%C3%B1o_sin_t%C3%ADtulo_13_fekc0m.png",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Custom image",
          confirmButtonColor: "rgb(56, 0, 56)",
        });
      }
    } else {
      // Si las credenciales son incorrectas, mostrar alerta de error
      Swal.fire({
        title: "Acceso denegado",
        text: `Credenciales incorrectas. `,
        icon: "error",
        timer: "6000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginAdmin(userData);
  };

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <h2 className={style.h2}>Bienvenido al Sitio Administrador</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className={style.label}>
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              className={style.input}
            />
            {errors.email ? (
              <p className={style.error}>{errors.email}</p>
            ) : (
              <p className={style.errorNot}> . </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className={style.label}>
              Contraseña:
            </label>
            <div className={style.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                className={style.input}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className={style.togglePasswordVisibility}
                onClick={togglePasswordVisibility}
              />
              {errors.password ? (
                <p className={style.error}>{errors.password}</p>
              ) : (
                <p className={style.errorNot}> . </p>
              )}
            </div>
          </div>
          <button type="submit" className={style.button}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LandingAdmin;
