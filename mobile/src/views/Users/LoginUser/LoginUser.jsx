import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react"
import { getMyBoliche, getMyBolicheID } from '../../../redux/actions';
import styles from "./LoginUser.module.css"
import charlieLetras from "../../../assets/img/charlie-blanco.png"
import logoCharlie from "../../../assets/img/logo-blanco.png"


function LoginUser() {
    const { clubName } = useParams()
    const dispatch = useDispatch()
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    //traer data del boliche -> si no error no deja ingresar
    useEffect(() => {
        dispatch(getMyBoliche(clubName));
        dispatch(getMyBolicheID(clubName));
    }, [])

    const myBolicheState = useSelector(state => state.myBoliche)


    const handleLogin = () => {
        const returnTo = `/${clubName}/home`;
        loginWithRedirect({
            appState: { returnTo }
        });
    };

    const handleClickCart = () => {
        navigate(`/${clubName}/home`)
    }



    // Render condicional si no existe boliche
    if (!myBolicheState.name && !myBolicheState.image) {
        return (
            <div className={styles.loginUser}>
                <img src={logoCharlie} alt="Charlie Logo" className={styles.logoRedirect} />
                <img src={charlieLetras} alt="Charlie" className={styles.logoLetrasRedirect} />
                <p>Para volver a ingresar, <br /> escaneá nuevamente el QR del boliche</p>
            </div>
        )
    }

    // Render condicional si boliche está inactivado
    if (myBolicheState.status !== "active") {
        return (
            <div className={styles.loginUser}>
                <img src={logoCharlie} alt="Charlie Logo" className={styles.logoRedirect} />
                <img src={charlieLetras} alt="Charlie" className={styles.logoLetrasRedirect} />
                <p>Este boliche se encuentra temporalmente <br /> inhabilitado </p>
            </div>
        )
    }

    // Render condicional si existe boliche
    if (myBolicheState) {
        return (
            <div className={styles.loginUser}>
                <div className={styles.containerLogos}>

                    <img className={styles.circleLogo} src={myBolicheState.image} alt="Logo" />

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

}

export default LoginUser

