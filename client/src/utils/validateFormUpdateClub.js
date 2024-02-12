export const validateFormUpdateClub = (data) => {
    const errors = {}
    const regExpLetter = /^[A-Za-z\s]+$/;
    const regExpAddress = /^[a-zA-Z0-9\s,]+$/;

    //NAME
    if (!data.name.length) errors.name = "Debe ingresar el nombre del club"
    else {
        if (data.name.length < 3) errors.name = "Debe contener al menos 3 caracteres"
        if (data.name.length > 15) errors.name = "Debe contener como máximo 15 caracteres"
        if (!regExpLetter.test(data.name)) errors.name = "Puede contener solo letras y espacios"
    }
    //ADDRESS
    if (!data.direccion || !data.direccion.length) errors.direccion = "Debe ingresar la dirección del club"
    else {
        if (data.direccion.length < 10) errors.direccion = "Debe contener al menos 10 caracteres"
        if (data.direccion.length > 25) errors.direccion = "Debe contener como máximo 25 caracteres"
        if (!regExpAddress.test(data.direccion)) errors.direccion = "Puede contener solo letras, números, espacios y comas"
    }
    //CIUDAD
    if (!data.ciudad.length) errors.ciudad = "Debe ingresar la ciudad del club"
    else {
        if (data.ciudad.length < 3) errors.ciudad = "Debe contener al menos 3 caracteres"
        if (data.ciudad.length > 15) errors.ciudad = "Debe contener como máximo 15 caracteres"
        if (!regExpLetter.test(data.ciudad)) errors.ciudad = "Puede contener solo letras y espacios"
    }
    //PAIS
    if (!data.pais.length) errors.pais = "Debe ingresar el país del club"
    else {
        if (data.pais.length < 3) errors.pais = "Debe contener al menos 3 caracteres"
        if (data.pais.length > 15) errors.pais = "Debe contener como máximo 15 caracteres"
        if (!regExpLetter.test(data.pais)) errors.pais = "Puede contener solo letras y espacios"
    }
    //STATUS 
    if (data.status === "") errors.status = "Debe seleccionar el estado del club"

    return errors
}