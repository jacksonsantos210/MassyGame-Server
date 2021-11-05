require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Logger = require("../utils/logger");
const config = require("../../config/auth");
const PlayerSchema = require("../yup/PlayerSchema");
const Player = require("../models/Player");
const PlayersSession = require("../models/PlayersSession");
const PlayersToken = require("../models/PlayersToken");
const Premier = require("../models/Premier");
const Stand = require("../models/Stand");

const Queue = require("../../lib/Queue");

const LIMIT = 10;

class PlayersController {
  async index(req, res) {
    try {
      let { page = 1 } = req.query;
      page = parseInt(page - 1);
      const { count: size, rows: players } = await Player.findAndCountAll({
        limit: LIMIT,
        offset: page * LIMIT,
        attributes: { exclude: ["password"] },
      });
      let pages = Math.ceil(size / LIMIT);
      return res.status(200).json({
        players: {
          size: size,
          pages: pages,
          actual: page + 1,
          data: players,
        },
      });
    } catch (error) {
      Logger.game("error", "PlayersController.index -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar listar jogadores",
      });
    }
  }

  async inGame(req, res) {
    try {
      let { page = 1 } = req.query;
      page = parseInt(page - 1);
      const { count: size, rows: sessions } =
        await PlayersSession.findAndCountAll({
          where: {
            logged: true,
          },
          attributes: { exclude: ["token"] },
          include: {
            model: Player,
            as: "player",
            attributes: { exclude: ["password"] },
          },
          limit: LIMIT,
          offset: page * LIMIT,
        });
      let pages = Math.ceil(size / LIMIT);
      return res.status(200).json({
        players: {
          size: size,
          pages: pages,
          actual: page + 1,
          data: sessions,
        },
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
        gaming: player.gaming,
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
      Logger.game("error", "PlayersController.audio -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar atualizar jogador",
      });
    }
  }

  /* async recovery(req, res) {
    try {
      const player = await Player.findOne({
        where: { email: req.body.email },
      });
      let message = "";
      if (!player) {
        message = "Não encontramos uma conta associada a este email!";
      } else {
        let token = await bcrypt.hash(player.email, 10);
        await PlayersToken.create({
          player_id: player.id,
          token: token,
        });
        message = `Olá ${
          player.name
        }, você solicitou a recuperação de senha? Para continuar acesse o link: 
                   ${
                     process.env.URL_GAME || "https://localhost:3000"
                   }/password-recovery?token=${token}`;
      }
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });
      transporter
        .sendMail({
          from: "Colecionáveis Massey",
          to: "",
          replyTo: "no-replay@masseyferguson60anos.com.br",
          subject: "Colecionáveis Massey - Password Recovery",
          text: message,
        })
        .then((info) => {
          return res.status(200).json({
            message: "Recuperação em processamento, verifique seu e-mail",
          });
        })
        .catch((error) => {
          Logger.game("error", "PlayersController.recovery -> ERROR: " + error);
          return res.status(400).json({
            message: "Erro ao processar o pedido de recuperação",
          });
        });
    } catch (error) {
      Logger.game("error", "PlayersController.recovery -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar gerar token de recuperação",
      });
    }
  } */

  async recovery(req, res) {
    try {
      const { email } = req.body;
      const player = await Player.findOne({
        where: { email: email },
      });
      if (!player) {
        return res.status(400).json({
          message: "Não encontramos uma conta associada a este email!",
        });
      }
      let token = await bcrypt.hash(player.email, 10);
      await PlayersToken.create({
        player_id: player.id,
        token: token,
      });
      //adicionar recuperação de eemail na fila
      await Queue.add({ player, token });

      return res.status(200).json({
        message: "Recuperação em processamento, verifique seu e-mail",
      });
    } catch (error) {
      Logger.game("error", "PlayersController.recovery -> ERROR: " + error);
      return res.status(500).json({
        message: "Erro ao tentar gerar token de recuperação",
      });
    }
  }

  async validateToken(req, res) {
    try {
      const player_token = await PlayersToken.findOne({
        where: { token: req.body.token },
      });
      if (player_token) {
        return res.status(200).json({
          message: "ok",
          player_id: player_token.player_id,
        });
      } else {
        return res.status(500).json({
          message: "Token Inválido",
          player,
        });
      }
    } catch (error) {
      Logger.game("error", "PlayersController.recovery -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar gerar token de recuperação",
      });
    }
  }

  async changePassword(req, res) {
    try {
      await Player.update(
        { password: bcrypt.hash(req.body.password, 10) },
        {
          where: { id: req.body.user_id },
        }
      );
      if (req.body.origin === "recovery") {
        await PlayersToken.destroy({
          where: { player_id: req.body.player_id },
        });
      }
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      Logger.game("error", "PlayersController.rules -> ERROR: " + error);
      return res.status(400).json({
        message: "Erro ao tentar atualizar jogador",
      });
    }
  }
}

module.exports = new PlayersController();
