const bcrypt = require("bcryptjs");
const moment = require("moment");
const Logger = require("../utils/logger");
const Figure = require("../models/Figure");
const Premier = require("../models/Premier");
const Player = require("../models/Player");
const Album = require("../models/Album");
const FigureSchema = require("../yup/FigureSchema");

class FiguresController {
  async index(req, res) {
    try {
      const figures = await Figure.findAll();
      return res.status(200).json({
        figures: figures,
      });
    } catch (error) {
      Logger.game("error", "FiguresController.index -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar listar figurinhas",
      });
    }
  }

  async show(req, res) {
    try {
      const figure = await Figure.findOne({ where: { id: req.params.id } });
      res.status(200).json({ figure: figure });
    } catch (error) {
      Logger.game("error", "FiguresController.show -> ERROR: " + error);
      res.status(500).json({
        message: "Falha ao carregar a figurinha",
      });
    }
  }

  async store(req, res) {
    try {
      if (!(await FigureSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      const figure = await Figure.create(req.body);
      return res.status(200).json({
        message: "Figurinha Cadastrado com sucesso",
        figure: figure,
      });
    } catch (error) {
      Logger.game("error", "FiguresController.store -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar inserir figurinha",
      });
    }
  }

  async openPremier(req, res) {
    try {
      const premier = await Premier.findOne({
        where: {
          hash: req.body.hash,
          opened: false,
        },
      });
      if (!premier) {
        return res.status(400).json({
          message: "Este premio já foi resgatado!",
        });
      }
      await Premier.update({ opened: true }, { where: { id: premier.id } });
      const player = await Player.findByPk(req.user_id);
      const { coin } = await Figure.findOne({
        where: { id: premier.figure_id },
      });
      let scoreNew = player.score + coin;
      await Player.update({ score: scoreNew }, { where: { id: req.user_id } });
      await Album.create({
        player_id: req.user_id,
        figure_id: premier.figure_id,
        origin: "premier",
      });
      return res.status(200).json({
        message: "Figurinha aberta com sucesso",
        premier: premier.figure_id,
      });
    } catch (error) {
      Logger.game("error", "FiguresController.getPremier -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao libear premio",
      });
    }
  }

  async getPremier(req, res) {
    try {
      const premier = await Premier.findOne({
        where: {
          hash: req.body.hash,
          opened: false,
        },
      });
      if (!premier) {
        return res.status(400).json({
          message: "Este premio já foi resgatado!",
        });
      }
      return res.status(200).json({
        premier: premier.figure_id,
      });
    } catch (error) {
      Logger.game("error", "FiguresController.getPremier -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao buscar seu prêmio",
      });
    }
  }

  async verifyPremier(req, res) {
    try {
      let premier = null;
      premier = await Premier.findOne({
        where: {
          player_id: req.user_id,
          date: moment().format("YYYY-MM-DD"),
        },
      });
      if (premier === null) {
        const hash = await bcrypt.hash(
          `user-${req.user_id}-${moment().format("YYYYMMDDHHmmSS")}`,
          10
        );
        let sort = Math.floor(Math.random() * (60 - 0) + 0);
        await Premier.create({
          date: moment().format("YYYY-MM-DD"),
          player_id: req.user_id,
          hash: hash,
          figure_id: sort,
          opened: false,
        });
        return res.status(200).json({ result: "new", values: hash });
      } else {
        if (premier.opened === false) {
          return res
            .status(200)
            .json({ premier: "closed", values: premier.hash });
        } else {
          return res
            .status(200)
            .json({ premier: "opened", values: premier.figure_id });
        }
      }
    } catch (error) {
      Logger.game(
        "error",
        "FiguresController.verifyPremier -> ERROR: " + error
      );
      return res.status(500).json({
        message: "Erro ao verificar premio",
      });
    }
  }
}

module.exports = new FiguresController();
