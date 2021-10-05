const { Model, DataTypes } = require("sequelize");

class InfluencersToken extends Model {
  static init(sequelize) {
    super.init(
      {
        influencer_id: DataTypes.INTEGER,
        token: DataTypes.STRING,
        opened: DataTypes.INTEGER,
        figure_id: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  /*  static associate(models) {
    this.belongsTo(models.Influencer, {
      foreingKey: "infulencer_id",
      as: "influencer",
    });
    this.belongsTo(models., { foreingKey: "player_id", as: "player" });
    this.belongsTo(models.Figure, { foreingKey: "figure_id", as: "figure" });
  } */
}

module.exports = InfluencersToken;
