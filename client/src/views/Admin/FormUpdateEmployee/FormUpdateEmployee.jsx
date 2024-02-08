import React, { useState } from 'react'
import { validateFormEmployeeAdmin } from '../../../utils/validateFormEmployeeAdmin';
import style from "./FormUpdateEmployee.module.css";
import { useDispatch } from 'react-redux';

function FormUpdateEmployee() {
    const dispatch = useDispatch()

    //!cuando este activo estado global allCollaborators y dispatch dejar todo esto descomentado y comentar el sig local state
    // const allCollaboratorsState = useSelector((state) => state.allCollaborators);
    // const { idCollaborator } = useParams();
    // console.log("ID", idCollaborator);
    // const collaboratorToUpdate = allCollaboratorsState.find(
    //   (collaborator) => collaborator.id === idCollaborator
    // );
    // const [collaboratorData, setCollaboratorData] = useState({
    //     name: collaboratorToUpdate.name,
    //     lastname: collaboratorToUpdate.lastname,
    //     password: collaboratorToUpdate.password,
    //     mail: collaboratorToUpdate.mail,
    //     status: collaboratorToUpdate.status,
    // })


    //local state for input
    const [collaboratorData, setCollaboratorData] = useState({
        name: "",
        lastname: "",
        password: "",
        mail: "",
        status: "",
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




    //! SUBMIT-> falta hacer actions y redux y el dispatch
    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            // dispatch(postColaborador(productData))
            window.alert("Colaborador agregado")
            setProductData({
                name: "",
                lastname: "",
                password: "",
                mail: "",
                status: "",
            })

        } catch (error) {
            window.alert("No se ha agregado el colaborador. Intente nuevamente")
        }
    }



    return (

        <form className={style.container} onSubmit={handleSubmit}>

            <h2>Editar Nuevo Colaborador</h2>

            <label htmlFor="name">Nombre: </label>
            <input type="text" id="name" key="name" name="name" value={collaboratorData.name} onChange={handleChange} />
            <p>{errors.name ? errors.name : null} </p>

            <label htmlFor="lastname" > Marca: </label>
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

            {/* //!agregar el link para dashboard */}
            <button type="button">Volver</button>

        </form>

    )
}


export default FormUpdateEmployee