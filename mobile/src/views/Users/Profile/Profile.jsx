import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from 'react-router-dom';
import NavBarUser from '../NavBarUser/NavBarUser'
import styles from "./Profile.module.css"


function Profile() {
    const { clubName } = useParams()
    const navigate = useNavigate()

    //log out de Auth0
    const { logout, isAuthenticated } = useAuth0();
    //redirecciona nuevamente a login -> no funciona
    // const handleLogout = () => {
    //     // Redirigir al usuario a la ruta dinámica después del cierre de sesión
    //     const returnTo = window.location.origin + `/${clubName}/login`;
    //     console.log(returnTo)
    //     logout({
    //         returnTo
    //     });
    // };

    return (
        <div className={styles.Profile}>
            <NavBarUser></NavBarUser>

            <div className={styles.profileContainer}>HISTORIAL DE PEDIDOS </div>


            {
                isAuthenticated && (
                    <button onClick={() => logout()} className={styles.profileButton}>
                        Sign out
                    </button>
                )
            }
        </div>
    )
}

export default Profile

