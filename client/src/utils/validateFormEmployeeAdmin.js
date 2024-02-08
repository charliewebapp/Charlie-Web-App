export const validateFormEmployeeAdmin = (data) => {
    const errors = {}
    const regExpLetter = /^[A-Za-z\s]+$/;
    const regExpPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
    const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //NAME
    if (!data.name.length) errors.name = "Debe ingresar el nombre del colaborador"
    else {
        if (data.name.length < 3) errors.name = "Debe contener al menos 3 caracteres"
        if (data.name.length > 15) errors.name = "Debe contener como máximo 15 caracteres"
        if (!regExpLetter.test(data.name)) errors.name = "Puede contener solo letras y espacios"
    }
    //LASTNAME
    if (!data.lastname.length) errors.lastname = "Debe ingresar el apellido del colaborador"
    else {
        if (data.lastname.length < 3) errors.lastname = "Debe contener al menos 3 caracteres"
        if (data.lastname.length > 15) errors.lastname = "Debe contener como máximo 15 caracteres"
        if (!regExpLetter.test(data.lastname)) errors.lastname = "Puede contener solo letras y espacios"
    }
    //PASSWORD
    if (!data.password.length) errors.password = "Debe asignar la contraseña del colaborador"
    else {
        if (data.password.length < 5) errors.password = "Debe contener al menos 5 caracteres"
        if (data.password.length > 10) errors.password = "Debe contener como máximo 10 caracteres"
        if (!regExpPassword.test(data.password)) errors.password = "Debe contener letras y números"
    }
    //EMAIL
    if (!data.mail.length) errors.mail = "Debe ingresar el email del colaborador"
    else {
        if (!regExpEmail.test(data.mail)) errors.mail = "Debe ser un formato de email válido"
    }
    //STATUS 
    if (data.status === "") errors.status = "Debe seleccionar el estado del colaborador"

    return errors
}