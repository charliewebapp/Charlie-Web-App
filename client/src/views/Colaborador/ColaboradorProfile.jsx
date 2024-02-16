import React, { useState } from 'react';
import Swal from "sweetalert2"
import { useDispatch } from 'react-redux';
import { changeColaboradorPassword } from '../../redux/actions';
import styles from './ColaboradorProfile.module.css';



const ColaboradorProfile = () => {


  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
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
      // Handle the error here
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

        <button type="submit">Cambiar contraseña</button>
      </form>
    </div>
  );
};

export default ColaboradorProfile;
