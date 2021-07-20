const yup = require("yup");

const AuthSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email com formato inválido")
    .required("O Email é requerido"),
  password: yup.string().required("A Senha é requerida"),
});

module.exports = AuthSchema;
