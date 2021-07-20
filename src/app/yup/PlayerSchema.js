const yup = require("yup");
const Player = require("../models/Player");

const PlayerSchema = yup.object().shape({
  id: yup.number().nullable(true),
  name: yup.string().required("O Nome é requerido"),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("O E-mail é requerido")
    .test(
      "unique-mail",
      "Este Email já esta cadastrado!",
      async function (value) {
        const { email } = this.parent;
        const player = await Player.findOne({ where: { email: email } });
        if (player != null) {
          if (player.id === id) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }
    ),
  phone: yup.string().required("O Nome é requerido"),
  birth: yup.date().required("A Data de aniverssário é requerida"),
  country: yup.string().required("O País é requerido"),
  provincy: yup.string().required("O Estado é requerido"),
  city: yup.string().required("A Cidade é requerida"),
  address: yup.string().required("O Endereço é requerido"),
});

module.exports = PlayerSchema;
