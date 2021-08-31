const Logger = require("../utils/logger");
const Influencer = require("../models/Influencer");
const InfluencerSchema = require("../yup/InfluencerSchema");

class InfluencersController {
  async index(req, res) {
    try {
      const influencers = await Influencer.findAll();
      return res.status(200).json({
        influencers: influencers,
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
      const influencer = await Influencer.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json({ influencer: influencer });
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
      const influencer = await Influencer.create(req.body);
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
}

module.exports = new InfluencersController();