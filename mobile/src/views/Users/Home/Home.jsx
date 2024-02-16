
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMyBoliche } from '../../../redux/actions'
import NavBarUser from '../NavBarUser/NavBarUser'

import { FaBottleDroplet, FaMartiniGlassCitrus } from "react-icons/fa6";
import { FaBeerMugEmpty } from "react-icons/fa6";
import { FaWineGlassAlt, FaGlassWhiskey } from "react-icons/fa";
import styles from "./Home.module.css"
import { Link } from 'react-router-dom';

function Home() {
    const { clubName } = useParams()
    const dispatch = useDispatch()



    return (

        <>
            <NavBarUser />
            <div className={styles.cardContainer}>

                <Link to={`/${clubName}/cart`}>
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>Tragos</div>
                        <FaMartiniGlassCitrus className={styles.icon} />

                    </div>
                </Link>

                <Link to={`/${clubName}/cart`}>
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>Cervezas</div>

                        <FaBeerMugEmpty className={styles.icon} />

                    </div>
                </Link>

                <Link to={`/${clubName}/cart`}>
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>Botellas</div>
                        <FaBottleDroplet className={styles.icon} />

                    </div>
                </Link>
                <Link to={`/${clubName}/cart`}>
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>Vinos</div>
                        <FaWineGlassAlt className={styles.icon} />

                    </div>
                </Link>
                <Link to={`/${clubName}/cart`}>
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>Shots</div>
                        <FaGlassWhiskey className={styles.icon} />

                    </div>
                </Link>
                <Link to={`/${clubName}/cart`}>
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>Sin Alcohol</div>
                        <FaBottleDroplet className={styles.icon} />

                    </div>
                </Link>
            </div>

        </>
    )
}

export default Home


