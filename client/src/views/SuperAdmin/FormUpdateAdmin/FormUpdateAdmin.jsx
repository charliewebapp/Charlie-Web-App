import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAdmins } from '../../../redux/actions';
import { validateFormAdmin } from '../../../utils/validateFormUpdateAdmin';
import style from '../SAForms.module.css';

function FormUpdateAdmin() {
    const dispatch = useDispatch();
    const [adminData, setAdminData] = useState({});

    const allAdmins = useSelector((state) => state.getAllAdmins);
    const { idAdmin } = useParams();

    const adminToUpdate = allAdmins.find(
        (admin) => admin.id === idAdmin
    );

    useEffect(() => {
        dispatch(getAdmins());
    }, []);

    useEffect(() => {
        if (adminToUpdate) {
            setAdminData({
                name: adminToUpdate.name_client,
                password: adminToUpdate.password,
                mail: adminToUpdate.mail,
                status: adminToUpdate.status,
            });
        }
    }, [adminToUpdate]);

    const [errors, setErrors] = useState({
        name: "Ingrese el nombre",
        lastname: "Ingrese el apellido",
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
            // onSubmit={handleSubmit}
            >

                <label htmlFor="name">Nombre: </label>
                <input type="text" id="name" key="name" name="name" value={adminData.name} onChange={handleChange} />
                <p>{errors.name ? errors.name : null} </p>

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
                    disabled={Object.values(errors).some(error => error && error.length > 0)}
                > EDITAR ADMIN
                </button>

            </form>

        </div>
    );
}

export default FormUpdateAdmin;