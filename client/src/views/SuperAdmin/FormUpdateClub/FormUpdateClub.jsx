import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBoliches, updateClub } from "../../../redux/actions";
import { validateFormUpdateClub } from "../../../utils/validateFormUpdateClub";
import Swal from "sweetalert2";
import style from "../DashboardSuperA/dashboard.module.css";
import logotype from "../../../assets/img/charlielogo.png";
import imgCharlie from "../../../assets/img/charlie.png";
import { RiLogoutBoxLine } from "react-icons/ri";

function FormUpdateClub() {
  const dispatch = useDispatch();
  const [clubData, setClubData] = useState({});

  const allClubs = useSelector((state) => state.allBoliches);
  const { idClub } = useParams();

  const clubToUpdate = allClubs.find((club) => club.id === idClub);

  console.log(clubToUpdate, "clubToUpdate");
  console.log(idClub, "idClub");

  useEffect(() => {
    dispatch(getBoliches());
  }, []);

  useEffect(() => {
    if (clubToUpdate) {
      setClubData({
        name: clubToUpdate.name,
        adress: clubToUpdate.adress,
        city: clubToUpdate.city,
        country: clubToUpdate.country,
        status: clubToUpdate.status,
        image: clubToUpdate.image,
      });
    }
  }, [clubToUpdate]);

  const [errors, setErrors] = useState({
    name: "*",
    adress: "*",
    city: "*",
    country: "*",
    status: "*",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setClubData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setErrors(validateFormUpdateClub(updatedData));

      return updatedData;
    });
  };

  const clubName = clubToUpdate.name;

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(clubData).forEach((key) => {
        formData.append(key, clubData[key]);
      });

      dispatch(updateClub(formData, clubName));

      Swal.fire({
        title: "Éxito",
        text: "El club se editó correctamente",
        icon: "success",
        timer: "3000",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.aside}>
          <img src={logotype} className={style.asideLogo} />
          <div className={style.logotype}>
            <img src={logotype} className={style.logo} />
            CHARLIE
          </div>
          <div className={style.buttones}>
            <Link to={`/superadmin/dashboard`}>
              <button className={style.button}>BOLICHES</button>
            </Link>
          </div>
          <div className={style.config}>
            <button className={style.btnCfg}>
              <RiLogoutBoxLine />
              Cerrar sesion
            </button>
          </div>
        </div>
        <div className={style.views}>
          <div className={style.navbar}>
            <h1 className={style.h1}>DASHBOARD SUPER ADMIN</h1>
          </div>
          <div className={style.dashboard}>
            <h2>EDITAR BOLICHE</h2>
            <form onSubmit={handleSubmit} className={style.FormPostAdminSA}>
              <label htmlFor="name">Nombre: </label>
              <input
                type="text"
                id="name"
                key="name"
                name="name"
                value={clubData.name}
                onChange={handleChange}
              />
              <span>{errors.name ? errors.name : null} </span>

              <label htmlFor="adress"> Direccion: </label>
              <input
                type="text"
                id="adress"
                key="adress"
                name="adress"
                value={clubData.adress}
                onChange={handleChange}
              />
              <span>{errors.adress ? errors.adress : null} </span>

              <label htmlFor="city"> Ciudad: </label>
              <input
                type="text"
                id="city"
                key="city"
                name="city"
                value={clubData.city}
                onChange={handleChange}
              />
              <span>{errors.city ? errors.city : null} </span>

              <label htmlFor="country"> Pais: </label>
              <input
                type="text"
                id="country"
                key="country"
                name="country"
                value={clubData.country}
                onChange={handleChange}
              />
              <span>{errors.country ? errors.country : null} </span>

              <label htmlFor="status"> Estado: </label>
              <select
                name="status"
                id="status"
                onChange={handleChange}
                value={clubData.status}
              >
                <option value="" disabled hidden>
                  Seleccione el estado:
                </option>
                <option value="active"> ACTIVO </option>
                <option value="inactive"> INACTIVO </option>
              </select>
              <span> {errors.status ? errors.status : null} </span>

              <button
                className={style.btnForms}
                type="submit"
                disabled={Object.values(errors).some(
                  (error) => error && error.length > 0
                )}
              >
                {" "}
                EDITAR BOLICHE
              </button>
            </form>

            <img src={imgCharlie} className={style.imgCharlie}></img>
          </div>

          <div className={style.footer}>© Charlie</div>
        </div>
      </div>
    </div>
  );
}

export default FormUpdateClub;
