const { Model, DataTypes } = require("sequelize");

class PlayersToken extends Model {
  static init(sequelize) {
    super.init(
      {
        player_id: DataTypes.INTEGER,
        token: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Player, { foreingKey: "player_id", as: "player" });
  }
}

module.exports = PlayersToken;
