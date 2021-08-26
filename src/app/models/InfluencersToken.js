const { Model, DataTypes } = require("sequelize");

class InfluencersToken extends Model {
  static init(sequelize) {
    super.init(
      {
        influencer_id: DataTypes.INTEGER,
        player_id: DataTypes.INTEGER,
        token: DataTypes.STRING,
        opened: DataTypes.BOOLEAN,
        figure_id: DataTypes.INTEGER,
        opened_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Influencer, {
      foreingKey: "infulencer_id",
      as: "influencer",
    });
    this.belongsTo(models.Player, { foreingKey: "player_id", as: "player" });
    this.belongsTo(models.Figure, { foreingKey: "figure_id", as: "figure" });
  }
}

module.exports = InfluencersToken;
