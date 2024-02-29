import React from 'react'
import styles from './OrderRejected.module.css'

function OrderRejected() {
    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Orden Rechazada</h1>
            <h2 className={styles.h2}>Por favor, acercate a la caja para solicitar el reintegro de tu dinero</h2>
        </div>
    )
}

export default OrderRejected