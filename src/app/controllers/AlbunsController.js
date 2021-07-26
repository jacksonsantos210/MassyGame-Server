const Logs = require("./LogsController");
const Album = require("../models/Album");
const AlbumSchema = require("../yup/AlbumSchema");
const Player = require("../models/Player");

class AlbunsController {
  async index(req, res) {
    try {
      await Logs.save("read_table", `Albuns all`, "player");
      const albums = await Album.findAll();
      return res.status(200).json({
        albums: albums,
      });
    } catch (error) {
      console.error(error);
      await Logs.save("error", `AlbunsController.index: ${error}`, "server");
      return res.status(400).json({
        message: "Erro ao tentar listar albuns",
      });
    }
  }

  async show(req, res) {
    try {
      await Logs.save(
        "read_table",
        `Albuns by player: ${req.param.id}`,
        "player"
      );
      const album = await Album.findOne({
        where: {
          id: req.params.id,
        },
        include: { association: "figure" },
      });
      return res.status(200).json({
        album: album,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Erro ao tentar carregar album",
      });
    }
  }

  async findByPlayer(req, res) {
    try {
      const albumsPasted = await Album.findAll({
        where: [
          { player_id: req.params.id },
          { pasted: true },
          { sale: false },
          { sold: false },
        ],
        include: { association: "figure" },
      });
      const albumsUnPasted = await Album.findAll({
        where: [
          { player_id: req.params.id },
          { pasted: false },
          { sale: false },
          { sold: false },
        ],
        include: { association: "figure" },
      });
      return res.status(200).json({
        pasted: albumsPasted,
        unpasted: albumsUnPasted,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Erro ao tentar carregar figurinhas do jogador",
      });
    }
  }

  async store(req, res) {
    try {
      if (!(await AlbumSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      const album = await Album.create(req.body);
      return res.status(200).json({
        message: "Figurinha salva com sucesso",
        album: album,
      });
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        message: "Erro ao tentar salvar figurinha",
      });
    }
  }

  async update(req, res) {
    try {
      if (!(await AlbumSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      const album = await Album.update(req.body);
      return res.status(200).json({
        message: "Figurinha salva com sucesso",
        album: album,
      });
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        message: "Erro ao tentar salvar figurinha",
      });
    }
  }
}

module.exports = new AlbunsController();
