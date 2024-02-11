const validation = (userData) => {
  const errors = {};

  if (!/\S+@\S+/.test(userData.email)) {
    errors.email = "Debe ser un email válido";
  }

  if (userData.email === "") {
    errors.email = "El email no puede estar vacio";
  }

  if (!/\d/.test(userData.password)) {
    errors.password = "La contraseña debe contener al menos un número";
  }

  if (userData.password.length < 7 || userData.password.length > 10) {
    errors.password = "La contraseña debe tener de 8 a 10 caracteres";
  }

  return errors;
};

export default validation;
