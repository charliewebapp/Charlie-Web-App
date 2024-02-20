import React from 'react'
import styles from "./RedirectLogOut.module.css"
import logoCharlie from "../../../assets/img/logocharlieblanco.png"

function RedirectLogOut() {
    return (
        <div className={styles.RedirectLogOut}>
            <img src={logoCharlie} alt="Charlie" className={styles.logo} />
            <h1>Vuelva pronto</h1>
            <p>Para volver a ingresar, escaneá el QR del boliche</p>
        </div>
    )
}

export default RedirectLogOut