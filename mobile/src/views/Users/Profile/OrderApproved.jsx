import React from 'react'
import styles from './OrderApproved.module.css'

function OrderRejected() {
    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Orden Aprobada</h1>
            <h2 className={styles.h2}>Sigue disfrutando de la noche!</h2>
        </div>
    )
}

export default OrderRejected