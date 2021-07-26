const Logs = require("./LogsController");
const Stand = require("../models/Stand");
const AlbumSchema = require("../yup/AlbumSchema");
const Player = require("../models/Player");
const Album = require("../models/Album");

const { Op } = import("sequelize");

class StandsController {
  async index(req, res) {
    try {
      //await Logs.save("read_table", `Stands all`, "player");
      const stands = await Stand.findAll({
        include: { association: "album" },
      });
      return res.status(200).json({
        stands: stands,
      });
    } catch (error) {
      console.error(error);
      //await Logs.save("error", `StandsController.index: ${error}`, "server");
      return res.status(400).json({
        message: "Erro ao tentar listar stands",
      });
    }
  }

  async show(req, res) {
    try {
      await Logs.save("read_table", `Stands by player:`, "player");
      const stand = await Stand.findOne({
        where: {
          id: req.params.id,
        },
        include: { association: "album" },
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
      const sales = await Stand.findAll({
        where: { sold: false },
        include: { association: "album" },
      });
      const hand = await Album.findAll({
        where: [
          { player_id: req.params.id },
          { pasted: false },
          { sale: false },
          { sold: false },
        ],
        include: { association: "figure" },
      });
      return res.status(200).json({
        sales: sales,
        hand: hand,
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
      /*   if (!(await AlbumSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      } */
      const stand = await Stand.create(req.body);
      const album = await Album.update(
        { sale: true },
        { where: { id: req.body.album_id } }
      );
      return res.status(200).json({
        message: "Figurinha salva com sucesso",
        stand: stand,
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

module.exports = new StandsController();
