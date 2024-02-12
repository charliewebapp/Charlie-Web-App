import React, { useState } from 'react'
import { validateFormEmployeeAdmin } from '../../../utils/validateFormEmployeeAdmin';
import style from "../Forms.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { updateCollaborator } from '../../../redux/actions';
import Swal from "sweetalert2"

function FormUpdateEmployee() {
    const dispatch = useDispatch()
    const clubName = useSelector((state) => state.selectClientAdmin);

    // CON ESTADO GOBAL REDUX
    const allCollaboratorsState = useSelector((state) => state.allCollaborators);
    const { idCollaborator } = useParams();

    const collaboratorToUpdate = allCollaboratorsState.find(
        (collaborator) => collaborator.id === idCollaborator
    );
    const [collaboratorData, setCollaboratorData] = useState({
        name: collaboratorToUpdate.name,
        lastname: collaboratorToUpdate.lastname,
        password: collaboratorToUpdate.password,
        mail: collaboratorToUpdate.mail,
        status: collaboratorToUpdate.status,
    })


    //local state errors
    const [errors, setErrors] = useState({
        name: "Ingrese el nombre",
        lastname: "Ingrese el apellido",
        password: "Asigne una contraseña",
        mail: "Ingrese el email",
        status: "Ingrese el estado",
    })


    //onChange inputs
    const handleChange = (event) => {
        const { name, value } = event.target;

        setCollaboratorData((prevData) => {
            const updatedData = { ...prevData, [name]: value };
            setErrors(validateFormEmployeeAdmin(updatedData));

            return updatedData;
        });
    };




    //! SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            dispatch(updateCollaborator(collaboratorData, idCollaborator, clubName))
            setCollaboratorData({
                name: "",
                lastname: "",
                password: "",
                mail: "",
                status: "",
            })
            Swal.fire({
                title: "Éxito",
                text: "El colaborador se editó correctamente",
                icon: "success",
                timer: "3000",
            })

        } catch (error) {
            //El sweet de error viene de actions
            console.log(error.message)
        }
    }



    return (
        <div className={style.formContainer}>
            <div>
                <h2>Editar Nuevo Colaborador</h2>
                <Link to={`/admin/${clubName}/dashboardAdmin`}>
                    <button>Volver </button>
                </Link>
            </div>


            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Nombre: </label>
                <input type="text" id="name" key="name" name="name" value={collaboratorData.name} onChange={handleChange} />
                <p>{errors.name ? errors.name : null} </p>

                <label htmlFor="lastname" > Apellido: </label>
                <input type="text" id="lastname" key="lastname" name="lastname" value={collaboratorData.lastname} onChange={handleChange} />
                <p>{errors.lastname ? errors.lastname : null} </p>

                <label htmlFor="password" > Password: </label>
                <input type="text" id="password" key="password" name="password" value={collaboratorData.password} onChange={handleChange} />
                <p>{errors.password ? errors.password : null} </p>

                <label htmlFor="mail" > E-mail: </label>
                <input type="text" id="mail" key="mail" name="mail" value={collaboratorData.mail} onChange={handleChange} />
                <p>{errors.mail ? errors.mail : null} </p>


                <label htmlFor="status" > Estado: </label>
                <select name="status" id="status" onChange={handleChange} value={collaboratorData.status} >
                    <option value="" disabled hidden>Seleccione el estado:</option>
                    <option value="active" > ACTIVO </option>
                    <option value="inactive"> INACTIVO </option>
                </select>
                <p> {errors.status ? errors.status : null} </p>


                <button
                    type="submit"
                    disabled={Object.values(errors).some(error => error && error.length > 0)}
                > EDITAR COLABORADOR
                </button>

            </form>
        </div>

    )
}


export default FormUpdateEmployee