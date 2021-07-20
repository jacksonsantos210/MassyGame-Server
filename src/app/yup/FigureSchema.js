const yup = require("yup");

const FigureSchema = yup.object().shape({
  name: yup.string().required("O Nome é requerido"),
  description: yup.string().required("A Descrição é requerida"),
  coin: yup.number().required("O valor em Massey Coin é requerido"),
  country: yup.string().required("O País é requerido"),
  especial: yup.boolean().required("Informe se é especial ou não"),
});

module.exports = FigureSchema;
