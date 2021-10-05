const moment = require("moment");
const Logger = require("../utils/logger");
const InfluencersToken = require("../models/InfluencersToken");
const InfluencersTokensUsed = require("../model/InfluencersTokensUsed");
const Figure = require("../models/Figure");
const Player = require("../models/Player");
const InfluencersTokensSchema = require("../yup/InfluencersTokensSchema");

class InfluencersTokensController {
  async index(req, res) {
    try {
      const tokens = await InfluencersToken.findAll({
        include: { association: "influencer" },
      });
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
        where: { token: req.params.token },
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

  async useds(req, res) {
    try {
      const tokens = await InfluencersTokensUsed.findAll();
      res.status(200).json({ tokens: tokens });
    } catch (error) {
      Logger.game(
        "error",
        "InfluencersTokensController.useds -> ERROR: " + error
      );
      res.status(500).json({
        message: "Falha ao carregar o token",
      });
    }
  }

  async store(req, res) {
    try {
      let tk = Math.random(100)
        .toString(16)
        .replace("/[^A-Z]+/G", "")
        .substr(2, 22)
        .toUpperCase();
      tk = tk + Math.floor(Math.random() * (60 - 0) + 0) + "M";
      let items = [];
      const type3 = await Figure.findAll({
        where: { type_id: 3 },
        attributes: { exclude: ["image"] },
      });
      type3.map((itm) => {
        items.push(itm);
      });
      const type4 = await Figure.findAll({
        where: { type_id: 4 },
        attributes: { exclude: ["image"] },
      });
      type4.map((itm) => {
        items.push(itm);
      });
      let figure = items[Math.floor(Math.random() * (items.length - 0) + 0)];
      await InfluencersToken.create({
        influencer_id: req.body.influencer_id,
        token: tk,
        opened: 0,
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
          where: { token: token },
        });
        if (data === null || data.opened >= 1000) {
          return res.status(400).json({
            message: "Limite de uso excedido",
          });
        }
        let newOpened = data.opened + 1;
        await InfluencersToken.update(
          {
            opened: newOpened,
          },
          {
            where: { id: data.id },
          }
        );

        await InfluencersTokensUsed.create({
          token_id: data.id,
          player_id: req.user_id,
          opened_at: moment().format("YYYY-MM-DD"),
        });
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

  async delete(req, res) {
    try {
      const token = await InfluencersToken.destroy({
        where: { id: req.params.id },
      });

      return res.status(200).json({
        message: "Dados removidos com sucesso",
        result: token,
      });
    } catch (error) {
      Logger.game(
        "error",
        "InfluencersTokensController.delete -> ERROR: " + error
      );
      return res.status(400).json({
        message: "Erro ao tentar remover token",
      });
    }
  }
}

module.exports = new InfluencersTokensController();
