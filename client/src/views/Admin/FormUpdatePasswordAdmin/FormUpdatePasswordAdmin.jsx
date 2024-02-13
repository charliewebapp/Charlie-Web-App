import React, { useState } from "react";
import { useSelector } from "react-redux";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./formupdatepasswordadmin.module.css";

function FormUpdatePasswordAdmin() {
  const selectAdminID = useSelector((state) => state.selectAdminLogin);
  const adminID = selectAdminID.id;
  const currentPassword = selectAdminID.password;

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
      //! dispatch(updateAdministratorPassword(adminID , newPassword))
      //! Agregar sweet alert
      setCurrentPasswordInput("");
      setNewPassword("");
      setConfirmNewPassword("");
      setCurrentPasswordError("");
      setNewPasswordError("");
      setConfirmNewPasswordError("");
    }
  };

  console.log("id", adminID);
  console.log("nueva contraseña", newPassword);

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit} className={style.form}>
        <label htmlFor="currentPassword">Contraseña Actual:</label>
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
          <div className={style.error}>{currentPasswordError}</div>
        )}

        <label htmlFor="newPassword">Nueva Contraseña:</label>
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
          <div className={style.error}>{newPasswordError}</div>
        )}

        <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña:</label>
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
          <div className={style.error}>{confirmNewPasswordError}</div>
        )}

        <button
          type="submit"
          className={style.button}
          disabled={
            currentPasswordError || newPasswordError || confirmNewPasswordError
          }
        >
          Actualizar Contraseña
        </button>
      </form>
    </div>
  );
}

export default FormUpdatePasswordAdmin;
