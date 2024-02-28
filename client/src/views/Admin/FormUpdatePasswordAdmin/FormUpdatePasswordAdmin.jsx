import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
import { useParams } from "react-router-dom";
import { updateAdmin } from "../../../redux/actions";
import Swal from "sweetalert2";
function FormUpdatePasswordAdmin() {
  const dispatch = useDispatch();
  const selectAdminID = useSelector((state) => state.selectAdminLogin);
  const { clubName } = useParams();

  const adminID = selectAdminID.id;

  const currentPassword = selectAdminID.password;
  console.log(adminID, "adminID", clubName, "clubName");
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleCurrentPasswordChange = (e) => {
    const value = e.target.value;
    setCurrentPasswordInput(value);
    setCurrentPasswordError(
      value !== currentPassword ? "La contraseña actual es incorrecta." : ""
    );
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setNewPasswordError(
      value.length < 8 || value.length > 10
        ? "La nueva contraseña debe tener entre 8 y 10 caracteres."
        : !/(?=.*[a-zA-Z])(?=.*\d)/.test(value)
        ? "La nueva contraseña debe contener al menos un número."
        : ""
    );
    setConfirmNewPasswordError(
      value !== confirmNewPassword ? "Las contraseñas nuevas no coinciden." : ""
    );
  };

  const handleConfirmNewPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmNewPassword(value);
    setNewPasswordError(
      value !== newPassword ? "Las contraseñas nuevas no coinciden." : ""
    );
    setConfirmNewPasswordError(
      value !== newPassword ? "Las contraseñas nuevas no coinciden." : ""
    );
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const formData = {
    password: newPassword,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentPasswordInput !== currentPassword) {
      setCurrentPasswordError("La contraseña actual es incorrecta.");
    }

    if (newPassword !== confirmNewPassword) {
      setNewPasswordError("Las contraseñas nuevas no coinciden.");
    }

    if (
      currentPasswordInput === currentPassword &&
      newPassword === confirmNewPassword
    ) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Estás a punto de cambiar tu contraseña",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cambiar contraseña",
        cancelButtonText: "No, cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateAdmin(formData, adminID, clubName));
          Swal.fire(
            "¡Cambiado!",
            "Has cambiado tu contraseña correctamente.",
            "success"
          );
          setCurrentPasswordInput("");
          setNewPassword("");
          setConfirmNewPassword("");
          setCurrentPasswordError("");
          setNewPasswordError("");
          setConfirmNewPasswordError("");
        }
      });
    }
  };

  return (
    <div className={style.changePasswordAdmin}>
      <h2>Cambiar Contraseña</h2>

      <form onSubmit={handleSubmit} className={style.FormPostAdminSA}>
        <label htmlFor="currentPassword">Contraseña Actual</label>
        <div className={style.passwordInput}>
          <input
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            value={currentPasswordInput}
            onChange={handleCurrentPasswordChange}
            className={style.input}
          />
          <FontAwesomeIcon
            icon={showCurrentPassword ? faEye : faEyeSlash}
            className={`${style.icon} ${showCurrentPassword && style.visible}`}
            onClick={toggleShowCurrentPassword}
          />
        </div>
        {currentPasswordError && (
          <span className={style.error}>{currentPasswordError}</span>
        )}

        <label htmlFor="newPassword">Nueva Contraseña</label>
        <div className={style.passwordInput}>
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            className={style.input}
          />
          <FontAwesomeIcon
            icon={showNewPassword ? faEye : faEyeSlash}
            className={`${style.icon} ${showNewPassword && style.visible}`}
            onClick={toggleShowNewPassword}
          />
        </div>
        {newPasswordError && (
          <span className={style.error}>{newPasswordError}</span>
        )}

        <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</label>
        <div className={style.passwordInput}>
          <input
            type={showConfirmNewPassword ? "text" : "password"}
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            className={style.input}
          />
          <FontAwesomeIcon
            icon={showConfirmNewPassword ? faEye : faEyeSlash}
            className={`${style.icon} ${
              showConfirmNewPassword && style.visible
            }`}
            onClick={toggleShowConfirmNewPassword}
          />
        </div>
        {confirmNewPasswordError && (
          <span className={style.error}>{confirmNewPasswordError}</span>
        )}

        <button
          type="submit"
          className={style.btnForms}
          disabled={
            currentPasswordError || newPasswordError || confirmNewPasswordError
          }
        >
          Actualizar contraseña
        </button>
      </form>
    </div>
  );
}

export default FormUpdatePasswordAdmin;
