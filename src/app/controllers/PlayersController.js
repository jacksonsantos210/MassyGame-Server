const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const Player = require("../models/Player");
const PlayerSchema = require("../yup/PlayerSchema");

class PlayersController {
  async index(req, res) {
    try {
      const players = await Player.findAll({
        attributes: { exclude: ["password"] },
      });
      return res.status(200).json({
        message: "success",
        players: players,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao tentar listar jogadores",
      });
    }
  }

  async show(req, res) {
    try {
      let result = {};
      const { id } = req.params;
      const player = await Player.findOne({
        where: { id: id },
        attributes: { exclude: ["password"] },
      });
      if (player) {
        result = {
          message: "success",
          player: player,
        };
      } else {
        result = {
          message: "not found",
        };
      }
      return res.status(200).json(result);
    } catch (error) {
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
    } catch (e) {
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
        where: { id: req.body.id },
      });

      return res.status(200).json({
        message: "Dados atualizados com sucesso",

        player: player,
      });
    } catch (e) {
      return res.status(400).json({
        message: "Erro ao tentar atualizar jogador",
      });
    }
  }
}

module.exports = new PlayersController();
