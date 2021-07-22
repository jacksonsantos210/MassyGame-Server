const Album = require("../models/Album");
const AlbumSchema = require("../yup/AlbumSchema");

class AlbunsController {
  async index(req, res) {
    console.log("request index on AlbunsController");
    try {
      const albuns = await Album.findAll({});
      console.log(albuns);
      return res.status(200).json({
        albuns: albuns,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Erro ao tentar listar albuns",
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

  /* async store(req, res) {
    try {
      if (!(await FigureSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      const figure = await Figure.create(req.body);
      return res.status(200).json({
        message: "Figurinha Cadastrado com sucesso",
        data: {
          figure: figure,
        },
      });
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        message: "Erro ao tentar inserir figurinha",
        data: {
          error: e.error,
        },
      });
    }
  }*/
}

module.exports = new AlbunsController();
