import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./NavBarUser.module.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { getMyBoliche, postUser } from "../../../redux/actions";
import { MdArrowBackIos } from "react-icons/md";
import loadingGif from "../../../assets/img/loading2.gif"

function NavBarUser() {
  const { clubName } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  //Conditional render nav bar items
  const location = useLocation();
  const currentPath = location.pathname;
  // console.log(currentPath);
  // const isHome = currentPath === `/${clubName}/home`;

  //* -------------------------------------------------- USER -----------------
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const setUserToPost = (userToPost) => {
    if (!isLoading && user) {
      return {
        id: userToPost?.sub, //google ok - facebook ok - auth0 ok - siempre el mismo para =user =medio
        name: userToPost?.name, //GOOGLE OK - FACEBOOK OK - auth0 aca tiene email
        mail: userToPost?.email || null, //google ok - facebook NO - auth0 si
      };
    }
  };
  const userData = setUserToPost(user);
  //* ------------------------------------------------- BOLICHE --------------
  useEffect(() => {
    dispatch(getMyBoliche(clubName));
  }, []);

  useEffect(() => {
    // Verifica si user está cargado y no está en modo de carga
    if (user && !isLoading && !isUserLoaded) {
      // Realiza el dispatch solo cuando user está cargado
      dispatch(postUser(userData));
      setIsUserLoaded(true);
    }
  }, [user, isLoading, isUserLoaded, dispatch, userData]);



  //* ---- GIF LOADING ----------------------------------------------------------
  if (isLoading) {
    return (
      <div className={styles.NavBarUser}>
        <img
          src={loadingGif}
          alt="Loading..."
          className={styles.loading}
        />
      </div>
    );
  }

  return (
    <div className={styles.NavBarUser}>
      {
        // render de foto perfil o iniciales en home
        isAuthenticated && (
          <div>
            {user.picture && (
              <Link to={`/${clubName}/profile`}>
                <img
                  className={styles.circleImage}
                  src={user.picture}
                  alt={user.name}
                />
              </Link>
            )}
            {user.given_name && user.family_name && !user.picture && (
              <Link to={`/${clubName}/profile`}>
                <div className={styles.circleWithText}>
                  {user.given_name[0] + user.family_name[0]}
                </div>
              </Link>
            )}
            {!user.picture && !user.given_name && !user.family_name && (
              <Link to={`/${clubName}/profile`}>
                <div className={styles.circleWithText}>{user.nickname[0]}</div>
              </Link>
            )}
          </div>
        )
      }
      {/* { // FLECHA BACK NO HACER - render de flecha volver en donde NO sea home

                !isHome && (
                    <Link to={location.state?.from || '/'}>
                        <div className={styles.circleIconBack}>
                            <MdArrowBackIos />
                        </div>
                    </Link>
                )
            } */}

      <Link to={`/${clubName}/home`} style={{ textDecoration: "none" }}>
        <div className={styles.circleLogo}>
          <p>LOGO</p>
          {/* aca iria el logo del boliche -> traer desde el server */}
          {/* <img src="src\assets\logoBanana.jpg" alt="" /> */}
        </div>
      </Link>

      <Link to={`/${clubName}/cart`} className={styles.cartLink}>
        <div className={styles.cartIconContainer}>
          <div className={styles.circleIcon}>
            <TiShoppingCart />
          </div>
          {itemCount > 0 && <div className={styles.itemCount}>{itemCount}</div>}
        </div>
      </Link>
    </div>
  );
}

export default NavBarUser;
