export default (data) => {
  let errors = {};

  if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.e1 = "Esto no es un email";
  }
  if (!data.email) {
    errors.e2 = "Ingresar email";
  }
  if (data.email.length > 35) {
    errors.e3 = "Excede limite";
  }
  if (!/.*\d.*/.test(data.password)) {
    errors.p1 = "Al menos incluir un numero";
  }
  if (data.password.length > 10) {
    errors.p2 = "Debe contener menos de 10 caracteres";
  }
  return errors;
};
