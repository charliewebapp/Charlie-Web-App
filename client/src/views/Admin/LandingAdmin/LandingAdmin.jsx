import React from "react";
import style from "./landingAdmin.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectClientAdminName,
  handleAdminStatusLogin,
  getAdmins,
  getBoliches,
} from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPersonWalkingDashedLineArrowRight,
} from "@fortawesome/free-solid-svg-icons";

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
  };

  const getAllAdmins = useSelector((state) => state.getAllAdmins);
  const allBoliches = useSelector((state) => state.allBoliches);
  const adminStatusLogin = useSelector((state) => state.adminStatusLogin);

  console.log("All admins", getAllAdmins);
  console.log("allBoliches", allBoliches);
  console.log("adminStatusLogin", adminStatusLogin);

  const loginAdmin = (userData) => {
    const adminLogin = getAllAdmins.find(
      (admin) =>
        admin.mail === userData.email && admin.password === userData.password
    );

    if (adminLogin) {
      const adminClient = adminLogin.ClientId;

      dispatch(handleAdminStatusLogin());

      const clientFromADmin = allBoliches.find(
        (boliche) => boliche.id === adminClient
      );

      const client = clientFromADmin.name;
      dispatch(selectClientAdminName(client));
      navigate(`/admin/${client}/dashboardAdmin`);
    } else {
      console.log("Usuario o contraseña incorrectos");
      // Manejar el caso en el que el usuario o contraseña sean incorrectos
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
        <h2>Bienvenido al Sitio de Administrador</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className={style.error}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <div className={style.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className={style.togglePasswordVisibility}
                onClick={togglePasswordVisibility}
              />
              {errors.email && <p className={style.error}>{errors.password}</p>}
            </div>
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default LandingAdmin;
