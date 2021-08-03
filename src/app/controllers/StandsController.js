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
      /*  await Logs.save("error", `StandsController.index: ${error}`, "server"); */
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
      //await Logs.save("read_table", `Stands by player :${req.params.id}`, "player");
      const sales = await Stand.findAll({
        where: { sold: false },
        include: { association: "figure" },
      });
      const hand = await Album.findAll({
        where: [{ player_id: req.user_id }, { pasted: false }, { sale: false }],
        include: { association: "figure" },
      });
      return res.status(200).json({
        sales: sales,
        hand: hand,
      });
    } catch (error) {
      /* await Logs.save(
        "error",
        `StandsController.findByPlayer: ${error}`,
        "server"
      ); */
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
        return res.status(400).json({
          message: "Esta figurinha foi comprada por outro jogador. &128533 ",
          error_cod: "stand-1",
        });
      }
      const player = await Player.findByPk(req.user_id);
      if (player.score < stand.figure.coin) {
        return res.status(400).json({
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
        let scoreNew = Player.score - stand.figure.coin;
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
        return res.status(400).json({
          message: "Falha ao finalizar a compra",
          error_cod: "stand-3",
        });
      }
    } catch (error) {
      console.error(error);
      /* await Logs.save("error", `StandsController.buy: ${error}`, "server"); */
      return res.status(400).json({
        message: "Erro ao tentar vender figurinha",
        error_cod: "stand-catch",
      });
    }
  }
}

module.exports = new StandsController();
