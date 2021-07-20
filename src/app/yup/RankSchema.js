const yup = require("yup");
import Player from "../models/Player";

const RankSchema = yup.object().shape({
  coin: yup
    .number("Pontuação em formato inválido")
    .required("A Pontuação é requerida"),
  player_id: yup
    .number("Jogador em formato inválido")
    .required("O Jodagor é requerido")
    .test("exist_player", "Jogador não encontrado", async function (value) {
      const { player_id } = this.parent;
      const player = await Player.findOne({ where: { id: player_id } });
      if (player === null) {
        return false;
      } else {
        return true;
      }
    }),
});

module.exports = RankSchema;
