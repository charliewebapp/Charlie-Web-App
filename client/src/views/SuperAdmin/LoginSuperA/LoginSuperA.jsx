import React from "react";
import { useState } from "react";
import validation from "./validation";
import style from "./LoginSuperA.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPersonWalkingDashedLineArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function LoginSuperA({ login }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (event) => {
    setErrors(
      validation({
        ...userData,
        [event.target.name]: event.target.value,
      })
    );

    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <h2 className={style.h2}>Bienvenido al Sitio Super Administrador</h2>

        <form>
          <label className={style.label}>Correo electrónico</label>
          <input
            onChange={handleChange}
            value={userData.email}
            type="text"
            name="email"
            className={style.input}
          />

          {errors.e1 ? (
            <p className={style.error}>{errors.e1}</p>
          ) : errors.e2 ? (
            <p className={style.error}>{errors.e2}</p>
          ) : (
            <p className={style.error}>{errors.e3}</p>
          )}

          <br />

          <div className={style.passwordContainer}>
            <label className={style.label}>Contraseña </label>
            <input
              onChange={handleChange}
              value={userData.password}
              type={showPassword ? "text" : "password"}
              name="password"
              className={style.input}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className={style.togglePasswordVisibility}
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.p1 ? (
            <p className={style.error}>{errors.p1}</p>
          ) : (
            <p className={style.error}>{errors.p2}</p>
          )}

          <br />

          <button type="submit" onClick={handleSubmit} className={style.button}>
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginSuperA;
