export const validateFormProductAdmin = (dataP) => {
    const errors = {}
    const regExpName = /^[A-Za-z\s]+$/;
    const regExpImage = /^https?:\/\//;
    const regExpNumbers = /^[0-9]+$/;
    //NAME
    if (!dataP.name.length) errors.name = "Debe ingresar el nombre del producto"
    else {
        if (dataP.name.length < 3) errors.name = "El nombre debe contener al menos 3 caracteres"
        if (dataP.name.length > 15) errors.name = "El nombre debe contener como máximo 15 caracteres"
        if (!regExpName.test(dataP.name)) errors.name = "El nombre debe contener solo letras y espacios"
    }
    // IMAGE
    if (dataP.image.length > 0) {
        if (!regExpImage.test(dataP.image)) errors.image = "Si ingresa imagen, debe ser un link que comience con http"
    }
    //DESCRIPTION
    if (!dataP.description.length) errors.description = "Debe ingresar la descipción del producto"
    else {
        if (dataP.description.length > 70) errors.description = "La descripción debe contener como máximo 70 caracteres"
    }
    //PRICE
    if (!dataP.price.length) errors.price = "Debe ingresar el precio del producto"
    else {
        if (!regExpNumbers.test(dataP.price)) errors.price = "El precio debe contener solo números enteros"
        if (dataP.price <= 0) errors.price = "El precio debe ser mayor a 0"
    }
    //STOCK 
    if (dataP.stock === "") errors.stock = "Debe seleccionar un tipo de categoría"
    //CATEGORY 
    if (dataP.category === "") errors.category = "Debe seleccionar un tipo de categoría"
    return errors
}