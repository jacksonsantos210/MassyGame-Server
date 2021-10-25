const moment = require("moment");
const Logger = require("../utils/logger");
const InfluencersUsed = require("../models/InfluencersUsed");
const Figure = require("../models/Figure");
const Player = require("../models/Player");
const Influencer = require("../models/Influencer");
const Album = require("../models/Album");

const LIMIT = 10;

class InfluencersUsedsController {
  async index(req, res) {
    try {
      let { page = 1 } = req.query;
      page = parseInt(page - 1);
      const { count: size, rows: vouchers } =
        await InfluencersUsed.findAndCountAll({
          include: [
            { association: "influencer" },
            { association: "player" },
            { association: "figure" },
          ],
          limit: LIMIT,
          offset: page * LIMIT,
        });
      let pages = Math.ceil(size / LIMIT);
      return res.status(200).json({
        vouchers: {
          size,
          pages,
          actual: page + 1,
          data: vouchers ? vouchers : null,
        },
      });
    } catch (error) {
      Logger.game(
        "error",
        "InfluencersUsedsController.index -> ERROR: " + error
      );
      return res.status(500).json({
        message: "Erro ao tentar listar Tokens dos Influencers",
      });
    }
  }

  async show(req, res) {
    try {
      const token = await InfluencersUsed.findOne({
        where: { token: req.params.token },
      });
      res.status(200).json({ token: token });
    } catch (error) {
      Logger.game(
        "error",
        "InfluencersUsedsController.show -> ERROR: " + error
      );
      res.status(500).json({
        message: "Falha ao carregar o token",
      });
    }
  }

  async useds(req, res) {
    try {
      let { page = 1 } = req.query;
      page = parseInt(page - 1);
      const { count: size, rows: vouchers } =
        await InfluencersUsed.findAndCountAll({
          limit: LIMIT,
          offset: page * LIMIT,
        });
      let pages = Math.ceil(size / LIMIT);
      res.status(200).json({
        vouchers: {
          size,
          pages,
          actual: page + 1,
          data: vouchers ? vouchers : null,
        },
      });
    } catch (error) {
      Logger.game(
        "error",
        "InfluencersUsedsController.useds -> ERROR: " + error
      );
      res.status(500).json({
        message: "Falha ao carregar o token",
      });
    }
  }

  async store(req, res) {
    try {
      const { token } = req.body;
      const influencer = await Influencer.findOne({
        where: {
          token: token,
        },
      });
      if (influencer === null) {
        return res.status(400).json({
          message: "Voucher inválido",
        });
      }
      if (influencer.indications >= 2000) {
        return res.status(400).json({
          message: "Que pena, este voucher já foi resgatado muitas vezes",
        });
      }
      const used = await InfluencersUsed.findAll({
        where: [{ player_id: req.user_id }, { influencer_id: influencer.id }],
      });
      if (used.length > 0) {
        return res.status(400).json({
          message: "Oops! Você já utilizou este Código.",
        });
      }
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
      await InfluencersUsed.create({
        influencer_id: influencer.id,
        player_id: req.user_id,
        opened_at: moment().format("YYYY-MM-DD"),
        figure_id: figure.id,
      });
      await Influencer.update(
        { indications: influencer.indications + 1 },
        { where: { id: influencer.id } }
      );
      const albums = await Album.findAll({
        where: [
          { player_id: req.user_id },
          { figure_id: figure.id },
          { repeted: false },
          { pasted: false },
        ],
      });
      const insert = await Album.create({
        player_id: req.user_id,
        figure_id: figure.id,
        origin: "influencer",
        pasted: false,
        repeted: albums.length > 0 ? false : true,
        sale: false,
      });

      return res.status(200).json({
        message: "Parabéns, prêmio resgatado com sucesso!",
        figure: figure,
        album: insert,
      });
    } catch (error) {
      Logger.game(
        "error",
        "InfluencersUsedsController.store -> ERROR: " + error
      );
      return res.status(500).json({
        message: "Erro ao tentar resgatar prêmio",
      });
    }
  }
}

module.exports = new InfluencersUsedsController();
