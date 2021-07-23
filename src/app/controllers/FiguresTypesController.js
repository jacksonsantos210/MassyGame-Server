const FiguresType = require("../models/FiguresType");

class FiguresTypesController {
  async index(req, res) {
    try {
      const types = await FiguresType.findAll();
      return res.status(200).json({
        types: types,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao tentar listar tipos de figurinhas",
      });
    }
  }

  async show(req, res) {
    try {
      const type = await FiguresType.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json({ type: type });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Falha ao carregar a figurinha",
      });
    }
  }

  async store(req, res) {
    try {
      const type = await FiguresType.create(req.body);
      return res.status(200).json({
        message: "Tipo de figurinha cadastrado com sucesso",
        type: type,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao tentar inserir figurinha",
      });
    }
  }
}

module.exports = new FiguresTypesController();
