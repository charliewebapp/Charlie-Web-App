export function validateFormUpdateColaborador(oldPassword, newPassword, confirmPassword, colaboradorPassword) {
    let errors1 = {};
    let errors = {};

    const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (oldPassword !== colaboradorPassword) {
        errors1.oldPassword = "La contraseña actual no es correcta";
    }

    if (newPassword !== confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (newPassword.length < 8 || newPassword.length > 15 || !passwordFormat.test(newPassword)) {
        errors.newPassword = "La contraseña debe tener entre 8 y 15 caracteres y al menos una letra mayúscula, una letra minúscula y un número";
    }


    return { ...errors1, ...errors };
}





