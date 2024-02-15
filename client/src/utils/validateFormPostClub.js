export const validateFormPostClub = (data) => {
  const errors = {};
  const regExpLetter = /^[A-Za-z0-9\s]+$/;
  const regExpAddress = /^[a-zA-Z0-9\s,]+$/;

  //NAME
  if (!data.name.length) errors.name = "Debe ingresar el nombre del club";
  else {
    if (data.name.length < 3)
      errors.name = "Debe contener al menos 3 caracteres";
    if (data.name.length > 15)
      errors.name = "Debe contener como máximo 15 caracteres";
    if (!regExpLetter.test(data.name))
      errors.name = "Puede contener solo letras, numeros y espacios";
  }
  //ADDRESS
  if (!data.adress || !data.adress.length)
    errors.adress = "Debe ingresar la dirección del club";
  else {
    if (data.adress.length < 3)
      errors.adress = "Debe contener al menos 4 caracteres";
    if (data.adress.length > 25)
      errors.adress = "Debe contener como máximo 25 caracteres";
    if (!regExpAddress.test(data.adress))
      errors.adress = "Puede contener solo letras, números, espacios y comas";
  }
  //CITY
  if (!data.city.length) errors.city = "Debe ingresar la ciudad del club";
  else {
    if (data.city.length < 3)
      errors.city = "Debe contener al menos 3 caracteres";
    if (data.city.length > 25)
      errors.city = "Debe contener como máximo 25 caracteres";
    if (!regExpLetter.test(data.city))
      errors.city = "Puede contener solo letras y espacios";
  }

  return errors;
};
