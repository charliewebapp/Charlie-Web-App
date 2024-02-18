import React from 'react'
import styles from "./RedirectLogOut.module.css"

function RedirectLogOut() {
    return (
        <div className={styles.RedirectLogOut}>
            <img src="\src\assets\logocharlieblanco.png" alt="Charlie" className={styles.logo} />
            <h1>Vuelva pronto</h1>
            <p>Para volver a ingresar, escaneá el QR del boliche</p>
        </div>
    )
}

export default RedirectLogOut