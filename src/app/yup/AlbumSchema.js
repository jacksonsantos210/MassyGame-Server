const yup = require("yup");

const FigureSchema = yup.object().shape({
  player_id: yup.string().required("O jogador é requerido"),
  figure_id: yup.string().required("A Figurinha é requerida"),
  origin: yup.string("Formato inválido").nullable(true),
  pasted: yup.boolean("Formato inválido").nullable(true),
  sold: yup.boolean("Formato inválido").nullable(true),
  sale: yup.boolean("Formato inválido").nullable(true),
});

module.exports = FigureSchema;
