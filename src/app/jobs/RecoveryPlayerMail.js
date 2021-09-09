import Mail from "../../lib/Mail";

export default {
  key: "RecoveryPlayerMail",
  async handle({ data }) {
    const { player, token } = data;

    await Mail.sendMail({
      from: `Colecionáveis Massey <${
        process.env.MAIL_FROM || "contato@jssolucoeseservicos.com.br"
      }>`,
      to: `${player.name} <${player.email}>`,
      replyTo: "no-replay@masseyferguson60anos.com.br",
      subject: "Pedido de Recuperação de senha",
      html: `Olá, ${
        player.nome
      }, você solicitou uma Recuperação de Senha? Para continuar acesse o link: 
      ${
        process.env.URL_GAME || "https://localhost:3000"
      }/password-recovery?token=${token}`,
    });
  },
};
