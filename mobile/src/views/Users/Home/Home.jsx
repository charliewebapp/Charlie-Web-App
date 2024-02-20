import { useParams } from "react-router-dom";
import NavBarUser from "../NavBarUser/NavBarUser";
import { Link } from "react-router-dom";
import { FaBottleDroplet, FaMartiniGlassCitrus } from "react-icons/fa6";
import { FaBeerMugEmpty, FaBottleWater } from "react-icons/fa6";
import { FaWineGlassAlt, FaGlassWhiskey, FaWineBottle } from "react-icons/fa";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";


function Home() {
  const { clubName } = useParams();
  const myUser = useSelector((state) => state.myUser);
  
  console.log("myUser: ", myUser);
  
  localStorage.setItem('myUser', JSON.stringify(myUser));

  return (
    <>
      <NavBarUser />
      <div className={styles.cardContainer}>
        <Link to={`/${clubName}/cards/tragos`} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Tragos</div>
            <FaMartiniGlassCitrus className={styles.icon} />
          </div>
        </Link>

        <Link to={`/${clubName}/cards/cervezas`} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Cervezas</div>

            <FaBeerMugEmpty className={styles.icon} />
          </div>
        </Link>

        <Link to={`/${clubName}/cards/botellas`} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Botellas</div>
            <FaWineBottle className={styles.icon} />
          </div>
        </Link>
        <Link to={`/${clubName}/cards/vinos`} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Vinos</div>
            <FaWineGlassAlt className={styles.icon} />
          </div>
        </Link>
        <Link to={`/${clubName}/cards/shots`} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Shots</div>
            <FaGlassWhiskey className={styles.icon} />
          </div>
        </Link>


        <Link to={`/${clubName}/cards/sinalcohol`} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Sin Alcohol</div>
            <FaBottleWater className={styles.icon} />
          </div>
        </Link>
      </div>
    </>
  );
}

export default Home;
