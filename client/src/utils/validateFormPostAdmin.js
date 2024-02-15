export const validateFormPostAdmin = (data) => {
  const errors = {};
  const regExpName = /^[A-Za-z\s]+$/;
  const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regExpPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

  //NAME_CLIENT
  if (!data.name_client.length)
    errors.name_client = "Debe ingresar el nombre del administrador";
  else {
    if (data.name_client.length < 3)
      errors.name_client = "Debe contener al menos 3 caracteres";
    if (data.name_client.length > 25)
      errors.name_client = "Debe contener como máximo 25 caracteres";
    if (!regExpName.test(data.name_client))
      errors.name_client = "Puede contener solo letras y espacios";
  }
  //MAIL
  if (!data.mail || !data.mail.length)
    errors.mail = "Debe ingresar el mail del administrador";
  else {
    if (!regExpEmail.test(data.mail))
      errors.mail = "Debe ingresar un mail válido";
  }
  //PASSWORD
  if (!data.password || !data.password.length)
    errors.password = "Debe ingresar la contraseña del administrador";
  else {
    if (data.password.length < 8)
      errors.password = "Debe contener al menos 8 caracteres";
    if (data.password.length > 20)
      errors.password = "Debe contener como máximo 20 caracteres";
    if (!regExpPassword.test(data.password))
      errors.password = "Debe contener al menos una letra y un número";
  }
  if (!data.password || !data.password.length)
    errors.password = "Debe ingresar la contraseña del administrador";
  else {
    if (data.password.length < 8)
      errors.password = "Debe contener al menos 8 caracteres";
  }
  //CLIENTID
  // if (!data.ClientId || !data.ClientId.length) errors.ClientId = "Debe seleccionar un boliche"

  return errors;
};
