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

  const validation = (userData) => {
    const errors = {};

    if (!/\S+@\S+/.test(userData.email)) {
      errors.email = "Debe ser un email válido";
    }
    if (userData.email === "") {
      errors.email = "El email no puede estar vacio";
    }

    if (userData.password.length < 6 || userData.password.length > 10) {
      errors.password = "La contraseña debe tener de 6 a 10 caracteres";
    }
    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors(
      validation({
        ...userData,
        [name]: value,
      })
    );
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
