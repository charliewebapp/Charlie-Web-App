import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleCollaboratorStatusLogout } from '../../redux/actions';
import styles from './colaboradornavbar.module.css';
import Swal from "sweetalert2";

const ColaboradorNavbar = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        Swal.fire({
            title: "Atencion!",
            text: "estas seguro que deseas cerrar sesion?",
            inputAttributes: {
                autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "confirmar",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                dispatch(handleCollaboratorStatusLogout());
                return Promise.resolve();
            }
        });
    }

    return (
        <nav className={styles.container}>
            <ul>
                <li>
                    <Link to="/colaborador/perfil">Profile</Link>
                </li>
                <li>
                    <Link to="/colaborador/qr">Scan QR Code</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default ColaboradorNavbar;