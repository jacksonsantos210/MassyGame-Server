const Logs = require("./LogsController");
const Stand = require("../models/Stand");
const Player = require("../models/Player");
const Album = require("../models/Album");

const limit = 12;

class StandsController {
  async index(req, res) {
    try {
      let { page = 1 } = req.query;
      page = parseInt(page - 1);
      const { count: size, rows: stands } = await Stand.findAndCountAll({
        where: { sold: false },
        include: { association: "figure" },
        limit: limit,
        offset: page * limit,
      });

      let pages = Math.ceil(size / limit);
      return res.status(200).json({
        size,
        pages,
        actual: page + 1,
        stands,
      });
    } catch (error) {
      console.error(error);
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
      /* await Logs.save("error", `StandsController.show: ${error}`, "server"); */
      return res.status(400).json({
        message: "Erro ao tentar carregar stand",
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

  async findByPlayer(req, res) {
    try {
      let { page = 1 } = req.query;
      page = parseInt(page - 1);
      const { count: size, rows: stands } = await Stand.findAndCountAll({
        where: { sold: false },
        include: { association: "figure" },
        limit: limit,
        offset: page * limit,
      });
      let pages = Math.ceil(size / limit);
      const hand = await Album.findAll({
        where: [{ player_id: req.user_id }, { pasted: false }, { sale: false }],
        include: { association: "figure" },
      });
      return res.status(200).json({
        sales: {
          size,
          pages,
          actual: page + 1,
          stands,
        },
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
      /* await Logs.save("insert", `Stands by player :${req.params.id}`, "player"); */
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
        let limit = 12;
        let { page = 1 } = req.query;
        page = parseInt(page - 1);
        const { count: size, rows: stands } = await Stand.findAndCountAll({
          where: { sold: false },
          include: { association: "figure" },
          limit: limit,
          offset: 0,
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
          sales: {
            size,
            pages,
            actual: page + 1,
            stands,
          },
          hand: hand,
        });
      }
    } catch (error) {
      console.error(error);
      /* await Logs.save("error", `StandsController.store: ${error}`, "server"); */
      return res.status(400).json({
        message: "Erro ao tentar vender figurinha",
      });
    }
  }

  async buy(req, res) {
    try {
      const stand = await Stand.findOne({
        where: { id: req.body.stand_id },
        include: { association: "figure" },
      });
      if (stand.sold == true) {
        return res.status(200).json({
          message: "Esta figurinha foi comprada por outro jogador. ",
          error_cod: "stand-1",
        });
      }
      const player = await Player.findByPk(req.user_id);
      if (player.score < stand.figure.coin) {
        return res.status(200).json({
          message: `Seu saldo é inferior oa valor da figura. Você tem M$ ${player.score}`,
          player_score: player.score,
          figure_coin: stand.figure.coin,
          error_cod: "stand-2",
        });
      }
      const album = await Album.create({
        player_id: player.id,
        figure_id: stand.figure.id,
        origin: "stand",
        pasted: false,
        sale: false,
        sale_at: null,
      });
      if (album) {
        let scoreNew = player.score - stand.figure.coin;
        await Player.update({ score: scoreNew }, { where: { id: player.id } });
        await Stand.update(
          { sold: true, sold_when: player.id, sold_at: Date() },
          { where: { id: stand.id } }
        );
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
        return res.status(201).json({
          message: "Compra efetuada com sucesso",
          album: album,
          cash: scoreNew,
          sales: sales,
          hand: hand,
        });
      } else {
        return res.status(200).json({
          message: "Falha ao finalizar a compra",
          error_cod: "stand-3",
        });
      }
    } catch (error) {
      console.error(error);
      /* await Logs.save("error", `StandsController.buy: ${error}`, "server"); */
      return res.status(400).json({
        message: "Erro ao tentar comprar figurinha",
        error_cod: "stand-catch",
      });
    }
  }
}

module.exports = new StandsController();
