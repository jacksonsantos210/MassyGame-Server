const Figure = require("../Models/Figure");
const yup = require("yup");

const yupSchema = yup.object().shape({
  Position: yup.number(),
  Especial: yup.boolean(),
  Coin: yup.number(),
  Image: yup.string(),
});

class FiguresController {
  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const figures = await Figure.paginate({}, { page, limit: 4 });
      res.status(200).json(figures);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Falha ao listar figurinhas",
      });
    }
  }

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
  }

  async store(req, res) {
    try {
      if (!(await yupSchema.isValid(req.body))) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      let count = await Figure.count();
      const { Position, Especial, Coin, Image } = req.body;
      const data = { pos, Email, Phone, Birth, Location, Password };
      if (Position === null || Position === undefined || length(Position) === 0)
        data.Position = count + 1;
      const figure = await Figure.create(data);
      return res.status(200).json({
        message: "Figurinha Cadastrada com sucesso",
        data: figure,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Erro ao tentar inserir usuário",
      });
    }
  }
}

module.exports = new FigureController();
