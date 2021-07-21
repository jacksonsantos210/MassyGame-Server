const yup = require("yup");

const FigureSchema = yup.object().shape({
  name: yup.string().required("O Nome é requerido"),
  description: yup.string().required("A Descrição é requerida"),
  coin: yup
    .number("Massey Coin em formato inválido")
    .required("O valor em Massey Coin é requerido"),
  image: yup.string().required("A Imagem é requerida"),
  especial: yup.boolean("Especial em formato inválido").nullable(true),
});

module.exports = FigureSchema;
