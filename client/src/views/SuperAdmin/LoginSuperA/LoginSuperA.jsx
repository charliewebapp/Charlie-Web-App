import React from "react";
import { useState } from "react";
import validation from "./validation";
import style from "../DashboardSuperA/dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPersonWalkingDashedLineArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import loginimg from "../../../assets/img/logo-login.png";

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
    login(userData).catch(() => {
      Swal.fire({
        icon: "error",
        title: "Usuario no encontrado",
        text: "Por favor, verifica si estás registrado o si las credenciales que ingresaste son correctas.",
      });
    });
  };

  return (
    <div className={style.containerSAA}>
      <div className={style.container1SA}>
        <img src={loginimg} alt="Logo-login" />
      </div>
      <div className={style.container2SA}>
        <div className={style.container2SALogin}>
          <h2 className={style.h2}>
            Bienvenido a <span className={style.charlie}>CHARLIE</span>
          </h2>

          <form className={style.formLogin} onSubmit={handleSubmit}>
            <label className={style.label}>Correo electrónico</label>
            <input
              onChange={handleChange}
              value={userData.email}
              type="text"
              name="email"
              className={style.input}
            />

            {errors.e1 ? (
              <span className={style.error}>{errors.e1}</span>
            ) : errors.e2 ? (
              <span className={style.error}>{errors.e2}</span>
            ) : (
              <span className={style.error}>{errors.e3}</span>
            )}

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
              <span className={style.error}>{errors.p1}</span>
            ) : (
              <span className={style.error}>{errors.p2}</span>
            )}

            <button className={style.btnLogin} type="submit">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginSuperA;
