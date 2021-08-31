const Logger = require("../utils/logger");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const Player = require("../models/Player");
const Premier = require("../models/Premier");
const Stand = require("../models/Stand");
const PlayerSchema = require("../yup/PlayerSchema");

class PlayersController {
  async index(req, res) {
    try {
      const players = await Player.findAndCountAll({
        attributes: { exclude: ["password"] },
      });
      return res.status(200).json({
        players: players,
      });
    } catch (error) {
      Logger.game("error", "PlayersController.index -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar listar jogadores",
      });
    }
  }

  async myData(req, res) {
    try {
      const player = await Player.findOne({
        where: { id: req.user_id },
        attributes: { exclude: ["password"] },
      });
      const { count: premiers } = await Premier.findAndCountAll({
        where: { player_id: req.user_id, opened: true },
      });
      const { count: sellers } = await Stand.findAndCountAll({
        where: { seller: req.user_id },
      });
      const { count: solds } = await Stand.findAndCountAll({
        where: { sold_when: req.user_id },
      });

      return res.status(200).json({
        name: player.name,
        email: player.email,
        phone: player.phone,
        birth: player.birth,
        country: player.country,
        provincy: player.provincy,
        city: player.city,
        address: player.address,
        language: player.language,
        photo: player.photo,
        audio_play: player.audio_play,
        rules_accept: player.rules_accept,
        cash: player.cash,
        score: player.score,
        premiers: premiers,
        stands: sellers + solds,
        videos: 0,
      });
    } catch (error) {
      Logger.game("error", "PlayersController.myData -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar retornar seus dados",
      });
    }
  }

  async show(req, res) {
    try {
      const player = await Player.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ["password"] },
      });
      return res.status(200).json({ player: player });
    } catch (error) {
      Logger.game("error", "PlayersController.show -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar listar jogadores",
      });
    }
  }

  async store(req, res) {
    try {
      if (!(await PlayerSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const player = await Player.create(req.body);
      req.body.password = undefined;
      return res.status(200).json({
        message: "Jogador Cadastrado com sucesso",
        player: player,
        token: jwt.sign({ id: player.id }, config.secret, {
          expiresIn: config.expireIn,
        }),
      });
    } catch (error) {
      Logger.game("error", "PlayersController.store -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar inserir jogador",
      });
    }
  }

  async update(req, res) {
    try {
      if (!(await PlayerSchema)) {
        return res.status(400).json({
          message: "Dados inválidos",
        });
      }
      const player = await Player.update(req.body, {
        where: { id: req.user_id },
      });

      return res.status(200).json({
        message: "Dados atualizados com sucesso",
        player: player,
      });
    } catch (error) {
      Logger.game("error", "PlayersController.update -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar atualizar jogador",
      });
    }
  }

  async rules(req, res) {
    try {
      const player = await Player.update(
        { rules_accept: true },
        {
          where: { id: req.user_id },
        }
      );
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      Logger.game("error", "PlayersController.rules -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar atualizar jogador",
      });
    }
  }

  async audio(req, res) {
    try {
      const player = await Player.update(
        { audio_play: req.params.state },
        {
          where: { id: req.user_id },
        }
      );
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      cLogger.game("error", "PlayersController.audio -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar atualizar jogador",
      });
    }
  }
}

module.exports = new PlayersController();
