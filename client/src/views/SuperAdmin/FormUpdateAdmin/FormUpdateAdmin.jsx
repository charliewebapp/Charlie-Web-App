import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAdministrators, getBoliches } from '../../../redux/actions';
import { validateFormAdmin } from '../../../utils/validateFormUpdateAdmin';
import { updateAdmin } from '../../../redux/actions';
import Swal from "sweetalert2"
import style from '../SAForms.module.css';

function FormUpdateAdmin() {
    const dispatch = useDispatch();
    const [adminData, setAdminData] = useState({});

    const allAdmins = useSelector((state) => state.allAdministrators
    ); const allBoliches = useSelector((state) => state.allBoliches);
    console.log(allBoliches, "allBoliches")
    const { idAdmin } = useParams();

    const adminToUpdate = allAdmins.find(
        (admin) => admin.id === idAdmin
    );
    console.log(adminToUpdate, "adminToUpdate")

    useEffect(() => {
        dispatch(getAdministrators());
        dispatch(getBoliches());
    }, []);

    useEffect(() => {
        if (adminToUpdate) {
            setAdminData({
                id: adminToUpdate.id,
                name_client: adminToUpdate.name_client,
                password: adminToUpdate.password,
                mail: adminToUpdate.mail,
                status: adminToUpdate.status,
            });
        }
    }, [adminToUpdate]);

    const club = allBoliches.find((club) => club.id === adminToUpdate.ClientId);
    const clubName = club.name;
    console.log(club, "club")
    console.log(clubName, "clubName")

    const [errors, setErrors] = useState({
        name_client: "Ingrese el nombre",
        password: "Asigne una contraseña",
        mail: "Ingrese el email",
        status: "Ingrese el estado",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setAdminData((prevData) => {
            const updatedData = { ...prevData, [name]: value };
            setErrors(validateFormAdmin(updatedData));

            return updatedData;
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            dispatch(updateAdmin(adminData, idAdmin, clubName));
            setAdminData({
                name_client: "",
                password: "",
                mail: "",
                status: "",
            });
            Swal.fire({
                title: "Éxito",
                text: "El administrador se editó correctamente",
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
                <h2>Editar Administrador</h2>
                <Link to={'/superadmin/dashboard'}>
                    <button>Volver a Clubs </button>
                </Link>
            </div>

            <br />

            <form
                onSubmit={handleSubmit}
            >

                <label htmlFor="name_client">Nombre: </label>
                <input type="text" id="name_client" key="name_client" name="name_client" value={adminData.name_client} onChange={handleChange} />
                <p>{errors.name_client ? errors.name_client : null} </p>

                <label htmlFor="password" > Password: </label>
                <input type="text" id="password" key="password" name="password" value={adminData.password} onChange={handleChange} />
                <p>{errors.password ? errors.password : null} </p>

                <label htmlFor="mail" > E-mail: </label>
                <input type="text" id="mail" key="mail" name="mail" value={adminData.mail} onChange={handleChange} />
                <p>{errors.mail ? errors.mail : null} </p>


                <label htmlFor="status" > Estado: </label>
                <select name="status" id="status" onChange={handleChange} value={adminData.status} >
                    <option value="" disabled hidden>Seleccione el estado:</option>
                    <option value="active" > ACTIVO </option>
                    <option value="inactive"> INACTIVO </option>
                </select>
                <p> {errors.status ? errors.status : null} </p>


                <button
                    type="submit"
                // disabled={Object.values(errors).some(error => error && error.length > 0)}
                > EDITAR ADMIN
                </button>

            </form>

        </div>
    );
}

export default FormUpdateAdmin;