const { Model, DataTypes } = require("sequelize");

class PlayersSession extends Model {
  static init(sequelize) {
    console.log("APP-> Model: PlayersSession, has been initialized");
    super.init(
      {
        player_id: DataTypes.INTEGER,
        token: DataTypes.STRING,
        ip_address: DataTypes.STRING,
        user_agent: DataTypes.STRING,
        payload: DataTypes.STRING,
        logged: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = PlayersSession;
