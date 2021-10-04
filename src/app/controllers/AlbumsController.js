const Logger = require("../utils/logger");
const Album = require("../models/Album");
const AlbumSchema = require("../yup/AlbumSchema");
const Player = require("../models/Player");
const { truncate } = require("fs");
const { array } = require("yup/lib/locale");

class AlbumsController {
  async index(req, res) {
    try {
      //Logger.game("info", "AlbumsController.index -> called");
      const albums = await Album.findAll();
      return res.status(200).json({
        albums: albums,
      });
    } catch (error) {
      Logger.game("error", "AlbumsController.index -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar listar albuns",
      });
    }
  }

  async show(req, res) {
    try {
      const album = await Album.findOne({
        where: {
          id: req.params.id,
        },
        /*   include: { association: "figure" }, */
      });
      return res.status(200).json({
        album: album,
      });
    } catch (error) {
      Logger.game("error", "AlbumsController.show -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar carregar album",
      });
    }
  }

  async findByPlayer(req, res) {
    try {
      const albumsPasted = await Album.findAll({
        where: [{ player_id: req.user_id }, { pasted: true }, { sale: false }],
        order: [["figure_id", "ASC"]],
      });
      const albumsUnPasted = await Album.findAll({
        where: [{ player_id: req.user_id }, { pasted: false }, { sale: false }],
        order: [["figure_id", "ASC"]],
      });
      return res.status(200).json({
        pasted: albumsPasted,
        unpasted: albumsUnPasted,
      });
    } catch (error) {
      Logger.game("error", "AlbumsController.findByPLayer -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar carregar figurinhas do jogador",
      });
    }
  }

  async historic(req, res) {
    try {
      const global = await Album.findAll({
        where: [{ player_id: req.user_id }, { pasted: false }, { sale: false }],
      });

      var a = [];
      await global.forEach(async (item) => {
        var vAlbum = await Album.findOne({
          where: [
            { player_id: req.user_id },
            { figure_id: item.figure_id },
            { pasted: true },
          ],
        });

        var b = {
          id: item.id,
          player_id: item.player_id,
          figure_id: item.figure_id,
          pasted: vAlbum ? true : false,
        };
        a.push(b);
      });
      console.log(a);
      return res.status(200).json({
        albums: a,
      });
    } catch (error) {
      Logger.game("error", "AlbumsController.historic -> ERROR: " + error);
      return res.status(500).json({
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
      return res.status(201).json({
        message: "Figurinha salva com sucesso",
        album: album,
      });
    } catch (error) {
      Logger.game("error", "AlbumsController.store -> ERROR: " + error);
      return res.status(500).json({
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
      return res.status(201).json({
        message: "Figurinha salva com sucesso",
        album: album,
      });
    } catch (error) {
      Logger.game("error", "AlbumsController.update -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar salvar figurinha",
      });
    }
  }

  async paste(req, res) {
    try {
      await Album.update(
        { pasted: true },
        { where: { id: req.body.album_id } }
      );
      return res.status(200).json({
        message: "Figurinha colada com sucesso",
      });
    } catch (error) {
      Logger.game("error", "AlbumsController.paste -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar salvar figurinha",
      });
    }
  }
}

module.exports = new AlbumsController();
