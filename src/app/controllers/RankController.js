const Logger = require("../utils/logger");
const Player = require("../models/Player");

class RankController {
  async index(req, res) {
    try {
      const top = await Player.findAll({
        order: [["score", "DESC"]],
        limit: 3,
        attributes: { exclude: ["password"] },
      });
      const players = await Player.findAndCountAll({
        order: [["score", "DESC"]],
        limit: 100,
        attributes: { exclude: ["password"] },
      });
      return res.status(200).json({
        top: top,
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
