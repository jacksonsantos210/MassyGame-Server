const Figure = require("../models/Figure");
const Premier = require("../models/Premier");
const FigureSchema = require("../yup/FigureSchema");

class FiguresController {
  async index(req, res) {
    try {
      const figures = await Figure.findAll();
      return res.status(200).json({
        figures: figures,
      });
    } catch (error) {
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
      console.log(error);
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
      console.error(error);
      return res.status(500).json({
        message: "Erro ao tentar inserir figurinha",
      });
    }
  }

  async getPremier(req, res) {
    try {
      const valid = await Premier.update(
        { opened: true },
        {
          where: {
            [Op.and]: [
              { player_id: req.params.id },
              { hash: req.body.hash },
              { opened: false },
            ],
          },
        }
      );
      console.log(valid);
      return res.status(200).json({
        message: "Figurinha Cadastrado com sucesso",

        figure: valid,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Erro ao libear premio",
      });
    }
  }

  async verifyPremier(req, res) {
    try {
      return res.status(200).json({ status: "ok" });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new FiguresController();
