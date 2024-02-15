export const validateFormAdmin = (data) => {
  const errors = {};
  const regExpLetter = /^[A-Za-z\s]+$/;
  const regExpPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
  const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //NAME
  if (!data.name_client.length)
    errors.name_client = "Debe ingresar el nombre del administrador";
  else {
    if (data.name_client.length < 3)
      errors.name_client = "Debe contener al menos 3 caracteres";
    if (data.name_client.length > 25)
      errors.name_client = "Debe contener como máximo 25 caracteres";
    if (!regExpLetter.test(data.name_client))
      errors.name_client = "Puede contener solo letras y espacios";
  }
  //PASSWORD
  if (!data.password.length)
    errors.password = "Debe asignar la contraseña del administrador";
  else {
    if (data.password.length < 8)
      errors.password = "Debe contener entre 8 y 20 caracteres";
    if (data.password.length > 20)
      errors.password = "Debe contener como máximo 20 caracteres";
    if (!regExpPassword.test(data.password))
      errors.password = "Debe contener letras y números";
  }
  //EMAIL
  if (!data.mail.length)
    errors.mail = "Debe ingresar el email del administrador";
  else {
    if (!regExpEmail.test(data.mail))
      errors.mail = "Debe ser un formato de email válido";
  }
  //STATUS
  if (data.status === "")
    errors.status = "Debe seleccionar el estado del administrador";

  return errors;
};
