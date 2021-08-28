const yup = require("yup");
const Admin = require("../models/Admin");

const AdminSchema = yup.object().shape({
  id: yup.number().nullable(true),
  name: yup.string().required("O Nome é requerido"),
  phone: yup.string().nullable(true),
  password: yup.string().nullable(true),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("O E-mail é requerido")
    .test(
      "unique-mail",
      "Este Email já esta cadastrado!",
      async function (value) {
        const { email } = this.parent;
        const admin = await Admin.findOne({ where: { email: email } });
        if (admin != null) {
          if (admin.id === id) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }
    ),
});

module.exports = AdminSchema;
