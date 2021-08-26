const yup = require("yup");

const InfluencersToekensSchema = yup.object().shape({
  influencer_id: yup.number().required("O Influencer é requerido"),
});

module.exports = InfluencersToekensSchema;
