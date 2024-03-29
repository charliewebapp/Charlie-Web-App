import React from "react";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
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
  collaboratorIdLogged,
  selectClientColaboratorName,
  getAllColaborators,
  handleCollaboratorStatusLogin,
  selectClientImage,
} from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPersonWalkingDashedLineArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import loginimg from "../../../assets/img/logo-login.png";

function LandingAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAdmins());
    dispatch(getBoliches());
    dispatch(getAllColaborators());
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

  const selectAdminID = useSelector((state) => state.selectAdminLogin);
  const adminID = selectAdminID.id;
  const getAllAdmins = useSelector((state) => state.getAllAdmins);
  const allBoliches = useSelector((state) => state.allBoliches);
  const getCollaborators = useSelector((state) => state.collaborators);
  console.log(getCollaborators);
  const adminStatusLogin = useSelector((state) => state.adminStatusLogin);

  const loginUsers = (userData) => {
    const adminLogin = getAllAdmins.find(
      (admin) =>
        admin.mail === userData.email && admin.password === userData.password
    );

    const collaboratorLogin = getCollaborators.find(
      (collaborator) =>
        collaborator.mail === userData.email &&
        collaborator.password === userData.password
    );

    if (adminLogin) {
      const adminClient = adminLogin.ClientId;

      if (adminLogin.status === "active") {
        dispatch(handleAdminStatusLogin());
        dispatch(adminIdLogged(adminLogin));

        const clientFromAdmin = allBoliches.find(
          (boliche) => boliche.id === adminClient
        );

        const client = clientFromAdmin.name;
        const clientid = clientFromAdmin.id;
        localStorage.setItem("clientName", JSON.stringify(client));
        localStorage.setItem("clientId", clientid);

        localStorage.setItem("adminID", adminID);
        const image = clientFromAdmin.image;
        localStorage.setItem("bolicheimagen", JSON.stringify(image));

        dispatch(selectClientAdminName(client));
        dispatch(selectClientImage(image));

        navigate(`/admin/${client}/dashboardAdmin`);
      } else if (adminLogin.status === "inactive") {
        Swal.fire({
          title: "Acceso denegado",
          text: "Usuario administrador inactivo temporalmente. Comuníquese con Charlie.ar.",
          imageUrl:
            "https://res.cloudinary.com/dzpqgjczu/image/upload/v1708029042/Dise%C3%B1o_sin_t%C3%ADtulo_13_fekc0m.png",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Custom image",
          confirmButtonColor: "rgb(56, 0, 56)",
        });
      }
    } else if (collaboratorLogin) {
      const collaboratorClient = collaboratorLogin.ClientId;
      localStorage.setItem("ColabClubId",JSON.stringify(collaboratorClient))


      if (collaboratorLogin.status === "active") {
        dispatch(handleCollaboratorStatusLogin());
        dispatch(collaboratorIdLogged(collaboratorLogin));

        const clientFromCollaborator = allBoliches.find(
          (boliche) => boliche.id === collaboratorClient
        );

        dispatch(selectClientColaboratorName(clientFromCollaborator));
        navigate("/colaborador/qr");
      } else if (collaboratorLogin.status === "inactive") {
        Swal.fire({
          title: "Acceso denegado",
          text: "Usuario colaborador inactivo temporalmente. Comuníquese con Charlie.ar.",
          imageUrl:
            "https://res.cloudinary.com/dzpqgjczu/image/upload/v1708029042/Dise%C3%B1o_sin_t%C3%ADtulo_13_fekc0m.png",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Custom image",
          confirmButtonColor: "rgb(56, 0, 56)",
        });
      }
    } else {
      // Utiliza collaboratorLogin para verificar las credenciales incorrectas
      Swal.fire({
        title: "Acceso denegado",
        text: "Credenciales incorrectas.",
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
    loginUsers(userData);
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={style.containerSAA}>
      <div className={style.container1SA}>
        <img src={loginimg} alt="Logo-login" />
      </div>
      <div className={style.container2SA}>
        <div className={style.container2SALogin}>
          <h2 className={style.h2}>
            Acceso al <span className={style.charlie}>BACKOFFICE</span>
          </h2>

          <form onSubmit={handleSubmit} className={style.formLogin}>
            <div>
              <label htmlFor="email" className={style.label}>
                Correo electrónico
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
                <span className={style.error}>{errors.email}</span>
              ) : (
                <span className={style.error}> </span>
              )}
            </div>
            <div>
              <label htmlFor="password" className={style.label}>
                Contraseña
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
                  <span className={style.error}>{errors.password}</span>
                ) : (
                  <span className={style.error}> </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className={style.btnLogin}
              disabled={isButtonDisabled}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingAdmin;
