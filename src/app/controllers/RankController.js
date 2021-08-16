const Logger = require("../utils/logger");
const Player = require("../models/Player");

const LIMIT = 5;

class RankController {
  async index(req, res) {
    try {
      let { page = 1 } = req.query;
      page = parseInt(page - 1);
      const top = await Player.findAll({
        order: [["score", "DESC"]],
        limit: 3,
        attributes: { exclude: ["password"] },
      });
      const { count: size, rows: players } = await Player.findAndCountAll({
        order: [["score", "DESC"]],
        limit: LIMIT,
        offset: page * LIMIT,
        attributes: { exclude: ["password"] },
      });
      let pages = 0;
      if (size <= 100) {
        pages = Math.ceil(size / LIMIT);
      } else {
        pages = 10;
      }
      return res.status(200).json({
        top: top,
        rank: {
          size,
          pages,
          actual: page + 1,
          players,
        },
      });
    } catch (error) {
      Logger.game("error", "RankController.index -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar listar rank",
      });
    }
  }
}

module.exports = new RankController();
