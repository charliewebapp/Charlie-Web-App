import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAdmins } from '../../../redux/actions';
import { validateFormUpdateClub } from '../../../utils/validateFormUpdateClub';
import style from '../SAForms.module.css';

function FormUpdateClub() {
    const dispatch = useDispatch();
    const [clubData, setClubData] = useState({});

    const allClubs = useSelector((state) => state.allBoliches);
    const { idClub } = useParams();

    const clubToUpdate = allClubs.find(
        (club) => club.id === idClub
    );

    useEffect(() => {
        dispatch(getAdmins());
    }, []);

    useEffect(() => {
        if (clubToUpdate) {
            setClubData({
                name: clubToUpdate.name,
                direccion: clubToUpdate.adress,
                ciudad: clubToUpdate.city,
                pais: clubToUpdate.country,
                status: clubToUpdate.status,
            });
        }
    }, [clubToUpdate]);

    const [errors, setErrors] = useState({
        name: "Ingrese el nombre del club",
        direccion: "Ingrese la dirección del club",
        ciudad: "Ingrese la ciudad del club",
        pais: "Ingrese el país del club",
        status: "Seleccione el estado del club",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setClubData((prevData) => {
            const updatedData = { ...prevData, [name]: value };
            setErrors(validateFormUpdateClub(updatedData));

            return updatedData;
        });
    };

    return (

        <div
            className={style.formContainer}
        >

            <div>
                <h2>Editar Club</h2>
                <Link to={'/superadmin/dashboard'}>
                    <button>Volver a Clubs </button>
                </Link>
            </div>

            <br />

            <form
            // onSubmit={handleSubmit}
            >

                <label htmlFor="name">Nombre: </label>
                <input type="text" id="name" key="name" name="name" value={clubData.name} onChange={handleChange} />
                <p>{errors.name ? errors.name : null} </p>

                <label htmlFor="adress" > Direccion: </label>
                <input type="text" id="adress" key="adress" name="adress" value={clubData.direccion} onChange={handleChange} />
                <p>{errors.adress ? errors.adress : null} </p>

                <label htmlFor="city" > Ciudad: </label>
                <input type="text" id="city" key="city" name="city" value={clubData.ciudad} onChange={handleChange} />
                <p>{errors.city ? errors.city : null} </p>

                <label htmlFor="country" > Pais: </label>
                <input type="text" id="country" key="country" name="country" value={clubData.pais} onChange={handleChange} />
                <p>{errors.country ? errors.country : null} </p>


                <label htmlFor="status" > Estado: </label>
                <select name="status" id="status" onChange={handleChange} value={clubData.status} >
                    <option value="" disabled hidden>Seleccione el estado:</option>
                    <option value="active" > ACTIVO </option>
                    <option value="inactive"> INACTIVO </option>
                </select>
                <p> {errors.status ? errors.status : null} </p>


                <button
                    type="submit"
                    disabled={Object.values(errors).some(error => error && error.length > 0)}
                > EDITAR CLUB
                </button>

            </form>

        </div>
    );
}

export default FormUpdateClub;