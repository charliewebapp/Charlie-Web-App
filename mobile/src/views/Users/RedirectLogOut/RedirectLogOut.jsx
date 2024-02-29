import React from 'react'
import styles from "./RedirectLogOut.module.css"
import logoCharlie from "../../../assets/img/logo-blanco.png"
import charlieLetras from "../../../assets/img/charlie-blanco.png"

function RedirectLogOut() {
    return (
        <div className={styles.RedirectLogOut}>
            <img src={logoCharlie} alt="Charlie Logo" className={styles.logo} />
            <img src={charlieLetras} alt="Charlie" className={styles.logoLetras} />
            <h1>Vuelva pronto</h1>
            <p>Para volver a ingresar, <br /> escaneá el QR del boliche</p>
        </div>
    )
}

export default RedirectLogOut