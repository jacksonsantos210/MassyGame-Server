const Figure = require("../models/Figure");
const FigureSchema = require("../yup/FigureSchema");

class FiguresController {
  async index(req, res) {
    try {
      const figures = await Figure.findAll();
      return res.status(200).json({
        figures: figures,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao tentar listar figurinhas",
      });
    }
  }
  /* 
  async show(req, res) {
    try {
      const figure = await Figure.findById(req.params.id);
      res.status(200).json(figure);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Falha ao carregar a figurinha",
      });
    }
  } */

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
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        message: "Erro ao tentar inserir figurinha",
      });
    }
  }
}

module.exports = new FiguresController();
