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
    if (!data.adress || !data.adress.length) errors.adress = "Debe ingresar la dirección del club"
    else {
        if (data.adress.length < 10) errors.adress = "Debe contener al menos 10 caracteres"
        if (data.adress.length > 25) errors.adress = "Debe contener como máximo 25 caracteres"
        if (!regExpAddress.test(data.adress)) errors.adress = "Puede contener solo letras, números, espacios y comas"
    }
    //city
    if (!data.city.length) errors.city = "Debe ingresar la city del club"
    else {
        if (data.city.length < 3) errors.city = "Debe contener al menos 3 caracteres"
        if (data.city.length > 15) errors.city = "Debe contener como máximo 15 caracteres"
        if (!regExpLetter.test(data.city)) errors.city = "Puede contener solo letras y espacios"
    }
    //country
    if (!data.country.length) errors.country = "Debe ingresar el país del club"
    else {
        if (data.country.length < 3) errors.country = "Debe contener al menos 3 caracteres"
        if (data.country.length > 15) errors.country = "Debe contener como máximo 15 caracteres"
        if (!regExpLetter.test(data.country)) errors.country = "Puede contener solo letras y espacios"
    }
    //STATUS 
    if (data.status === "") errors.status = "Debe seleccionar el estado del club"

    return errors
}