const { Model, DataTypes } = require("sequelize");

class InfluencersTokensUsed extends Model {
  static init(sequelize) {
    super.init(
      {
        token_id: DataTypes.INTEGER,
        player_id: DataTypes.INTEGER,
        opened: DataTypes.BOOLEAN,
        opened_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );
  }

  /* static associate(models) {
    this.belongsTo(models.Influencer, {
      foreingKey: "token_id",
      as: "tokens",
    });
    this.belongsTo(models.Player, { foreingKey: "player_id", as: "player" });
  } */
}

module.exports = InfluencersToken;
