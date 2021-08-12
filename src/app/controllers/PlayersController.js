const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const Player = require("../models/Player");
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
      console.error(error);
      return res.status(400).json({
        message: "Erro ao tentar listar jogadores",
      });
    }
  }

  async me(req, res) {
    var user = null;
    if (req.user_type === "player")
      user = await Player.findOne({
        where: { id: req.user_id },
        attributes: { exclude: ["password"] },
        include: { association: "albums" },
      });
    if (req.user_type === "admin")
      user = await Admin.findOne({
        where: { id: req.user_id },
        attributes: { exclude: ["password"] },
      });
    if (req.user_type === "dev")
      user = await Developer.findOne({
        where: { id: req.user_id },
        attributes: { exclude: ["password"] },
      });
    return res.status(200).json(user);
  }

  async show(req, res) {
    try {
      let result = {};
      const player = await Player.findOne({
        where: { id: req.user_id },
        attributes: { exclude: ["password"] },
      });
      if (player) {
        result = {
          player: player,
        };
      } else {
        result = {
          message: "not found",
        };
      }
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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
      console.error(error);
      return res.status(400).json({
        message: "Erro ao tentar atualizar jogador",
      });
    }
  }
}

module.exports = new PlayersController();
