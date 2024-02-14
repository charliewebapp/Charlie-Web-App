import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react"
import { getMyBoliche } from '../../../redux/actions';

function LoginUser() {
    //ingresa a charlie.ar/:clubName/login -> saco clubName || apreto boton login y redirige a auth0 ||
    const { clubName } = useParams()
    const dispatch = useDispatch()
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    //traer data del boliche para renderizar logo
    useEffect(() => {
        dispatch(getMyBoliche(clubName))

    }, [])

    const handleLogin = () => {
        // Guardar la ruta dinámica actual en el estado local
        const returnTo = `/${clubName}/home`;

        // Iniciar el inicio de sesión con Auth0
        loginWithRedirect({
            appState: { returnTo }
        });
    };

    const handleClickCart = () => {
        navigate(`/${clubName}/home`)
    }

    return (
        <>
            <div>Logo del boliche segun request server</div>
            <h1>Bienvenido a {clubName}</h1>

            {
                !isAuthenticated && (
                    <button onClick={handleLogin}>Iniciar sesión</button>)
            }

            { //si está logueado -> lleva a la carta
                isAuthenticated && (
                    <button onClick={handleClickCart}>Ver Carta</button>
                )
            }







        </>

    )
}

export default LoginUser