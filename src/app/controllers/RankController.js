const Player = require("../models/Player");

class RankController {
  async index(req, res) {
    try {
      const players = await Player.findAll({
        include: { association: "figure" },
      });
      return res.status(200).json({
        rank: players,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Erro ao tentar listar rank",
      });
    }
  }
}

module.exports = new RankController();
