const Logger = require("../utils/logger");
const Player = require("../models/Player");
const Figure = require("../models/Figure");
const Influencer = require("../models/Influencer");
const InfluencersUsed = require("../models/InfluencersUsed");
const InfluencerSchema = require("../yup/InfluencerSchema");

const LIMIT = 10;

class InfluencersController {
  async index(req, res) {
    try {
      let { page = 1 } = req.query;
      page = parseInt(page - 1);
      const { count: size, rows: influencers } =
        await Influencer.findAndCountAll({
          limit: LIMIT,
          offset: page * LIMIT,
        });
      let pages = Math.ceil(size / LIMIT);
      return res.status(200).json({
        influencers: {
          size,
          pages,
          actual: page + 1,
          data: influencers ? influencers : null,
        },
      });
    } catch (error) {
      Logger.game("error", "InfluencersController.index -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar listar Influencer",
      });
    }
  }

  async show(req, res) {
    try {
      const influencer_id = req.params.id;
      let { page = 1 } = req.query;
      page = parseInt(page - 1);
      const influencer = await Influencer.findOne({
        where: { id: influencer_id },
      });
      const { count: size, rows: tokens } =
        await InfluencersUsed.findAndCountAll({
          where: { influencer_id: influencer_id },
          include: [
            {
              model: Player,
              as: "player",
              attributes: { exclude: ["password"] },
            },
            {
              model: Figure,
              as: "figure",
              attributes: { exclude: ["image"] },
            },
          ],
          limit: LIMIT,
          offset: page * LIMIT,
        });

      let pages = Math.ceil(size / LIMIT);

      res.status(200).json({
        influencer: influencer,
        tokens: {
          size,
          pages,
          actual: page + 1,
          data: tokens ? tokens : null,
        },
      });
    } catch (error) {
      Logger.game("error", "InfluencersController.show -> ERROR: " + error);
      res.status(500).json({
        message: "Falha ao carregar o influencer",
      });
    }
  }

  async store(req, res) {
    try {
      if (!(await InfluencerSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      const { name, phone, email, tag } = req.body;
      let token = "";
      tag === null || tag === undefined || tag.length === 0
        ? (token = name)
        : (token = tag);
      token = token.toUpperCase().replace(/\s/g, "") + "M@60";
      console.log(token);
      const influencer = await Influencer.create({
        name: name,
        phone: phone,
        email: email,
        token: token,
        indications: 0,
      });
      return res.status(200).json({
        message: "Influencer Cadastrado com sucesso",
        influencer: influencer,
      });
    } catch (error) {
      Logger.game("error", "InfluencersController.store -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar inserir influencer",
      });
    }
  }

  async update(req, res) {
    try {
      if (!(await InfluencerSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      const influencer = await Influencer.update(req.body, {
        where: { id: req.params.id },
      });

      return res.status(200).json({
        message: "Dados atualizados com sucesso",
        influencer: influencer,
      });
    } catch (error) {
      Logger.game("error", "InfluencersController.update -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar atualizar influencer",
      });
    }
  }

  async delete(req, res) {
    try {
      const influencer = await Influencer.destroy({
        where: { id: req.params.id },
      });

      return res.status(200).json({
        message: "Dados removidos com sucesso",
        result: influencer,
      });
    } catch (error) {
      Logger.game("error", "InfluencersController.delete -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar remover influencer",
      });
    }
  }
}

module.exports = new InfluencersController();
