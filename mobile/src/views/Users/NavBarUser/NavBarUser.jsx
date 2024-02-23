import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./NavBarUser.module.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyBoliche,
  postUser,
  setCartFromLocalStorage,
} from "../../../redux/actions";
import { MdArrowBackIos } from "react-icons/md";
import loadingGif from "../../../assets/img/loading2.gif";
import { GiShoppingCart } from "react-icons/gi";
import charlieLetras from "../../../assets/img/charlie-blanco.png"

function NavBarUser() {
  const { clubName } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    // Recuperar el carrito del localStorage al montar el componente
    if (cartFromLocalStorage) {
      dispatch(setCartFromLocalStorage(cartFromLocalStorage));
    }
  }, [dispatch]);



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

  useEffect(() => {
    // Verifica si user está cargado y no está en modo de carga
    if (user && !isLoading && !isUserLoaded) {
      // Realiza el dispatch solo cuando user está cargado
      dispatch(postUser(userData));
      setIsUserLoaded(true);
    }
  }, [user, isLoading, isUserLoaded, dispatch, userData]);


  //* ------------------------------------------------- BOLICHE --------------
  useEffect(() => {
    dispatch(getMyBoliche(clubName));
  }, []);

  const myBolicheState = useSelector(state => state.myBoliche)

  //* ---- GIF LOADING NAV BAR ----------------------------------------------------------
  if (isLoading) {
    return (
      <div className={styles.NavBarUser}>
        <img src={loadingGif} alt="Loading..." className={styles.loading} />
      </div>
    );
  }

  //* RENDER NAV BAR CARGADA
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


      <Link to={`/${clubName}/home`} style={{ textDecoration: "none" }}>
        <div className={styles.containerLogos} >
          <img className={styles.circleLogo} src={myBolicheState.image} alt="Logo" />
          <div className={styles.byLetras}>by</div>
        </div>
        <img src={charlieLetras} alt="Charlie" className={styles.logoLetras} />
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
