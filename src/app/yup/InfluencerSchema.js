const yup = require("yup");

const InfluencerSchema = yup.object().shape({
  name: yup.string().required("O Nome é requerido"),
  phone: yup.string().nullable(true),
  email: yup.string().email("E-mail em formato inválido").nullable(true),
});

module.exports = InfluencerSchema;
