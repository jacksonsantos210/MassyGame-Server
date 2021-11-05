const bcrypt = require("bcryptjs");
const moment = require("moment");
const Logger = require("../utils/logger");
const Figure = require("../models/Figure");
const Premier = require("../models/Premier");
const Player = require("../models/Player");
const Album = require("../models/Album");
const FigureSchema = require("../yup/FigureSchema");

const DATE_TOP_PREMIERS = new Date("2021-10-15");

class FiguresController {
  async index(req, res) {
    try {
      const figures = await Figure.findAll({
        attributes: { exclude: ["image"] },
        include: { association: "type" },
      });
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
        figure_id: premier.figure1_id,
        origin: "premier",
      });
      await Album.create({
        player_id: req.user_id,
        figure_id: premier.figure2_id,
        origin: "premier",
      });
      await Album.create({
        player_id: req.user_id,
        figure_id: premier.figure3_id,
        origin: "premier",
      });
      return res.status(200).json({
        message: "Figurinhas abertas com sucesso",
        premier1: premier.figure1_id,
        premier1: premier.figure2_id,
        premier1: premier.figure3_id,
      });
    } catch (error) {
      Logger.game("error", "FiguresController.getPremier -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao libear prêmio",
      });
    }
  }

  async getPremier(req, res) {
    try {
      const premier = await Premier.findOne({
        where: {
          hash: req.body.hash,
        },
      });
      return res.status(200).json({
        premier1: premier.figure1_id,
        premier2: premier.figure2_id,
        premier3: premier.figure3_id,
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
        let items = [];
        const type1 = await Figure.findAll({
          where: { type_id: 1 },
          attributes: { exclude: ["image"] },
        });
        type1.map((itm) => {
          items.push(itm);
        });
        const type2 = await Figure.findAll({
          where: { type_id: 2 },
          attributes: { exclude: ["image"] },
        });
        type2.map((itm) => {
          items.push(itm);
        });

        let thisMoment = new Date();
        var a = moment([
          DATE_TOP_PREMIERS.getUTCFullYear(),
          DATE_TOP_PREMIERS.getUTCMonth(),
          DATE_TOP_PREMIERS.getUTCDay(),
        ]);
        var b = moment([
          thisMoment.getUTCFullYear(),
          thisMoment.getUTCMonth(),
          thisMoment.getUTCDay(),
        ]);
        let dateDiff = a.diff(b, "days");
        if (dateDiff <= 0) {
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
        }
        let p1 = items[Math.floor(Math.random() * (items.length - 0) + 0)];
        let p2 = items[Math.floor(Math.random() * (items.length - 0) + 0)];
        let p3 = items[Math.floor(Math.random() * (items.length - 0) + 0)];
        await Premier.create({
          date: moment().format("YYYY-MM-DD"),
          player_id: req.user_id,
          hash: hash,
          figure1_id: p1.id,
          figure2_id: p2.id,
          figure3_id: p3.id,
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
