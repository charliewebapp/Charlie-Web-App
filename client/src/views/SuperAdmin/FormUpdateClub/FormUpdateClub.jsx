import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getBoliches, updateClub } from '../../../redux/actions';
import { validateFormUpdateClub } from '../../../utils/validateFormUpdateClub';
import Swal from "sweetalert2"
import style from '../SAForms.module.css';

function FormUpdateClub() {
    const dispatch = useDispatch();
    const [clubData, setClubData] = useState({});

    const allClubs = useSelector((state) => state.allBoliches);
    const { idClub } = useParams();

    const clubToUpdate = allClubs.find(
        (club) => club.id === idClub
    );

    console.log(clubToUpdate, "clubToUpdate")
    console.log(idClub, "idClub")

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
        name: "Ingrese el nombre del club",
        adress: "Ingrese la dirección del club",
        city: "Ingrese la ciudad del club",
        country: "Ingrese el país del club",
        status: "Seleccione el estado del club",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setClubData((prevData) => {
            const updatedData = { ...prevData, [name]: value };
            setErrors(validateFormUpdateClub(updatedData));

            return updatedData;
        })
    };

    const clubName = clubToUpdate.name;

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(clubData).forEach(key => {
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
                onSubmit={handleSubmit}
            >

                <label htmlFor="name">Nombre: </label>
                <input type="text" id="name" key="name" name="name" value={clubData.name} onChange={handleChange} />
                <p>{errors.name ? errors.name : null} </p>

                <label htmlFor="adress" > Direccion: </label>
                <input type="text" id="adress" key="adress" name="adress" value={clubData.adress} onChange={handleChange} />
                <p>{errors.adress ? errors.adress : null} </p>

                <label htmlFor="city" > Ciudad: </label>
                <input type="text" id="city" key="city" name="city" value={clubData.city} onChange={handleChange} />
                <p>{errors.city ? errors.city : null} </p>

                <label htmlFor="country" > Pais: </label>
                <input type="text" id="country" key="country" name="country" value={clubData.country} onChange={handleChange} />
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