const bcrypt = require("bcryptjs");
const moment = require("moment");
const Logger = require("../utils/logger");
const Influencer = require("../models/Influencer");
const InfluencersToken = require("../models/InfluencersToken");
const Figure = require("../models/Figure");
const Player = require("../models/Player");
const Album = require("../models/Album");
const InfluencersTokensSchema = require("../yup/InfluencersTokensSchema");

class InfluencersTokensController {
  async index(req, res) {
    try {
      const tokens = await InfluencersToken.findAll();
      return res.status(200).json({
        tokens: tokens,
      });
    } catch (error) {
      Logger.game(
        "error",
        "InfluencersTokensController.index -> ERROR: " + error
      );
      return res.status(500).json({
        message: "Erro ao tentar listar Tokens dos Influencers",
      });
    }
  }

  async show(req, res) {
    try {
      const token = await InfluencersToken.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json({ token: token });
    } catch (error) {
      Logger.game(
        "error",
        "InfluencersTokensController.show -> ERROR: " + error
      );
      res.status(500).json({
        message: "Falha ao carregar o token",
      });
    }
  }

  async store(req, res) {
    try {
      if (!(await InfluencersTokensSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      let tk = Math.random(100)
        .toString(16)
        .replace("/[^A-Z]+/G", "")
        .substr(2, 22)
        .toUpperCase();
      tk = tk + Math.floor(Math.random() * (60 - 0) + 0) + "M";
      let items = [];
      const type3 = await Figure.findAll({
        where: { type: 3 },
        attributes: { exclude: ["image"] },
      });
      type3.map((itm) => {
        items.push(itm);
      });
      const type4 = await Figure.findAll({
        where: { type: 4 },
        attributes: { exclude: ["image"] },
      });
      type4.map((itm) => {
        items.push(itm);
      });
      let figure = items[Math.floor(Math.random() * (items.length - 0) + 0)];
      const token = await InfluencersToken.create({
        influencer_id: req.body.influencer_id,
        token: tk,
        opened: false,
        figure_id: figure.id,
      });
      return res.status(200).json({
        message: "Token Cadastrado com sucesso",
        token: tk, // token,
      });
    } catch (error) {
      Logger.game(
        "error",
        "InfluencersTokensController.store -> ERROR: " + error
      );
      return res.status(500).json({
        message: "Erro ao tentar inserir token",
      });
    }
  }

  async update(req, res) {
    try {
      const { token } = req.body;
      if (token === null) {
        return res.status(500).json({
          message: "Token inválido",
        });
      } else {
        const data = await InfluencersToken.findOne({
          where: [{ token: token }, { opened: false }],
        });
        if (data === null) {
          return res.status(400).json({
            message: "Token já utilizado",
          });
        }

        await InfluencersToken.update(
          {
            player_id: req.user_id,
            opened: true,
            opened_at: moment().format("YYYY-MM-DD"),
          },
          {
            where: { token: token },
          }
        );
        const player = await Player.findByPk(req.user_id);
        const { coin } = await Figure.findOne({
          where: { id: data.figure_id },
        });
        let scoreNew = player.score + coin;
        await Player.update(
          { score: scoreNew },
          { where: { id: req.user_id } }
        );
        return res.status(200).json({
          message: "Prêmio entregue com sucesso!",
          figure: data.figure_id,
        });
      }
    } catch (error) {
      Logger.game(
        "error",
        "InfluencersTokensController.update -> ERROR: " + error
      );
      return res.status(400).json({
        message: "Erro ao tentar abrir token",
      });
    }
  }
}

module.exports = new InfluencersTokensController();
