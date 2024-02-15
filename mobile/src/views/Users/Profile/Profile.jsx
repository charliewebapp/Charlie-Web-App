import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from 'react-router-dom';


function Profile() {
    const { clubName } = useParams()
    const navigate = useNavigate()

    //log out de Auth0
    const { logout, isAuthenticated } = useAuth0();
    const handleLogout = () => {
        // Redirigir al usuario a la ruta dinámica después del cierre de sesión
        const returnTo = window.location.origin + `/${clubName}/login`;
        console.log(returnTo)
        logout({
            returnTo
        });

        // Redirigir manualmente a la ruta después del cierre de sesión
        navigate(`/${clubName}/login`);
    };

    return (
        <div>
            <p>Profile - Acá va el historial de pedidos </p>

            //BOTON DE LOG OUT CON AUTH0
            {
                isAuthenticated && (
                    <button onClick={handleLogout}>
                        Sign out
                    </button>
                )
            }
        </div>
    )
}

export default Profile
