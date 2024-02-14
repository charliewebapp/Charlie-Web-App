import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./NavBarUser.module.css"
import { Link, useParams } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";

function NavBarUser() {
    const { clubName } = useParams()



    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log(user)
    //{given_name: 'Natalia ', family_name: 'Lossada', nickname: 'nlossada.nl', name: 'Natalia Lossada', picture: 'https://lh3.googleusercontent.com/a/ACg8ocI-pIprxW6NsPOk9ROnvaX5wOgDTNV6les8Wk5gDyS8j2X6=s96-c', …}

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div className={styles.NavBarUser}>
            {
                isAuthenticated && (
                    <div >
                        {
                            user.picture && (
                                <Link to={`/${clubName}/profile`} >
                                    <img className={styles.circleImage} src={user.picture} alt={user.name} />
                                </Link>

                            )
                        }
                        {
                            !user.picture && (
                                <Link to={`/${clubName}/profile`} >
                                    <div className={styles.circleWithText}>{user.given_name[0] + user.family_name[0]}</div>
                                </Link>
                            )
                        }


                    </div>)
            }

            <div className={styles.circleLogo}>
                <p>LOGO</p>
                {/* aca iria el logo del boliche -> traer desde el server */}
                <img src="src\assets\logoBanana.jpg" alt="" />
            </div>

            <div className={styles.circleIcon}>
                <TiShoppingCart />
            </div>


        </div>

    );
};


export default NavBarUser