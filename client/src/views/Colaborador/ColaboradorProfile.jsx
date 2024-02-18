import React, { useState } from 'react';
import Swal from "sweetalert2"
import { useDispatch } from 'react-redux';
import { changeColaboradorPassword } from '../../redux/actions';
import { useSelector } from 'react-redux';
import styles from './ColaboradorProfile.module.css';
import { validateFormUpdateColaborador } from '../../utils/validateFormUpdateColaborador';


const ColaboradorProfile = () => {

  const selectedColaborador = useSelector((state) => state.selectColaboratorLogin);
  const colaboradorPassword = selectedColaborador.password

  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState("");
  const [oldPassError, setOldPassError] = useState("");

  const handleChangeOldPassword = (e) => {
    const value = e.target.value;
    setOldPassword(value);
    const errors1 = validateFormUpdateColaborador(value, newPassword, confirmPassword, colaboradorPassword);
    setOldPassError(errors1.oldPassword)
  };

  const handleChangeNewPassword = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    const errors = validateFormUpdateColaborador(oldPassword, value, confirmPassword, colaboradorPassword);
    setError(errors.newPassword || errors.confirmPassword);
  };

  const handleChangeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    const errors = validateFormUpdateColaborador(oldPassword, newPassword, value, colaboradorPassword);
    setError(errors.newPassword || errors.confirmPassword);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Atencion!",
        text: "estas seguro que deseas cambiar tu contraseña?",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "confirmar",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          // dispatch(changeColaboradorPassword(newPassword));
          return Promise.resolve();
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Éxito",
            text: "Tu contraseña ha sido cambiada!",
            icon: "success",
            timer: "4000",
          });
          console.log('Contraseña cambiada');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className={styles.container}>
      <h2>Cambio de contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="oldPassword">Contraseña anterior:</label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={handleChangeOldPassword}
        />
        <p>{oldPassError ? oldPassError : null} </p>

        <label htmlFor="newPassword">Contraseña nueva:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={handleChangeNewPassword}
        />

        <label htmlFor="confirmPassword">Repite tu contraseña nueva:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
        />
        <p>{error}</p>

        <button type="submit" disabled={error || oldPassError || !oldPassword || !newPassword || !confirmPassword}>Cambiar contraseña</button>
      </form>
    </div>
  );
};

export default ColaboradorProfile;
