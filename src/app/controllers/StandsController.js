const Logs = require("./LogsController");
const Stand = require("../models/Stand");
const Player = require("../models/Player");
const Album = require("../models/Album");

class StandsController {
  async index(req, res) {
    try {
      //await Logs.save("read_table", `Stands all`, "player");
      const stands = await Stand.findAll({
        include: { association: "figure" },
      });
      return res.status(200).json({
        stands: stands,
      });
    } catch (error) {
      console.error(error);
      await Logs.save("error", `StandsController.index: ${error}`, "server");
      return res.status(400).json({
        message: "Erro ao tentar listar stands",
      });
    }
  }

  async show(req, res) {
    try {
      //await Logs.save("read_table", `Stands by player:`, "player");
      const stand = await Stand.findOne({
        where: {
          id: req.params.id,
        },
        include: { association: "figure" },
      });
      return res.status(200).json({
        stand: stand,
      });
    } catch (error) {
      console.error(error);
      await Logs.save("error", `StandsController.show: ${error}`, "server");
      return res.status(400).json({
        message: "Erro ao tentar carregar stand",
      });
    }
  }

  async findByPlayer(req, res) {
    try {
      //await Logs.save("read_table", `Stands by player :${req.params.id}`, "player");
      const sales = await Stand.findAll({
        where: { sold: false },
        include: { association: "figure" },
      });
      const hand = await Album.findAll({
        where: [
          { player_id: req.user_id },
          { pasted: false },
          { sale: false },
        ],
        include: { association: "figure" },
      });
      return res.status(200).json({
        sales: sales,
        hand: hand,
      });
    } catch (error) {
      await Logs.save(
        "error",
        `StandsController.findByPlayer: ${error}`,
        "server"
      );
      console.error(error);
      return res.status(400).json({
        message: "Erro ao tentar carregar figurinhas do jogador",
      });
    }
  }

  async store(req, res) {
    try {
      await Logs.save("insert", `Stands by player :${req.params.id}`, "player");
      /*   if (!(await AlbumSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      } */
      const { player_id, figure } = await Album.findOne({
        where: { id: req.body.album_id },
        include: { association: "figure" },
      });
      if (player_id != req.user_id) {
        await Logs.save(
          "danger",
          `StandsController.store: One attempt insert stand, this player not is a user logged`,
          "server"
        );
        return res.status(400).json({
          message: "Jogador sem permissão de venda",
        });
      } else {
        await Album.update(
          { sale: true, sale_at: Date() },
          { where: { id: req.body.album_id } }
        );
        const stand = await Stand.create({
          seller: player_id,
          figure_id: figure.id,
        });
        const { score } = await Player.findByPk(req.user_id);
        let scoreNew = score + figure.coin;
        await Player.update({ score: scoreNew }, { where: { id: player_id } });
        const sales = await Stand.findAll({
          where: { sold: false },
          include: { association: "figure" },
        });
        const hand = await Album.findAll({
          where: [
            { player_id: req.user_id },
            { pasted: false },
            { sale: false },
          ],
          include: { association: "figure" },
        });
        return res.status(200).json({
          message: "Figurinha vendida com sucesso",
          cash: scoreNew,
          stand: stand,
          sales: sales,
          hand: hand,
        });
      }
    } catch (error) {
      console.error(error);
      await Logs.save("error", `StandsController.store: ${error}`, "server");
      return res.status(400).json({
        message: "Erro ao tentar vender figurinha",
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
