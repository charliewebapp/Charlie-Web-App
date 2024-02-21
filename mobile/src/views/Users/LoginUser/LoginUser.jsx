import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react"
import { getMyBoliche } from '../../../redux/actions';
import styles from "./LoginUser.module.css"
import charlieLetras from "../../../assets/img/charlie-blanco.png"

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
        <div className={styles.loginUser}>
            <div className={styles.containerLogos}>
                <div className={styles.circleLogo}>
                    <p>LOGO</p>
                </div>
                <div className={styles.byLetras}>by</div>
                <img src={charlieLetras} alt="Charlie" className={styles.logoLetras} />

            </div>



            {
                !isAuthenticated && (
                    <button className={styles.loginButton} onClick={handleLogin}>Log In</button>)
            }

            { //si está logueado -> lleva a la carta
                isAuthenticated && (
                    <button className={styles.loginButton} onClick={handleClickCart}>Ver Carta</button>
                )
            }
        </div>

    )
}

export default LoginUser

