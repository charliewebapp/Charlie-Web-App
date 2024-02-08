import React from "react";
import { useState } from "react";
import style from "./LandingAdmin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LandingAdmin() {
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
    // setErrors(
    //   validation({
    //     ...userData,
    //     [name]: value,
    //   })
    // );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alternar entre mostrar y ocultar la contraseña
  };

  const hanleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <h2>Bienvenido al Sitio de Administrador</h2>
        <form onSubmit={hanleSubmit}>
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
            </div>
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default LandingAdmin;
