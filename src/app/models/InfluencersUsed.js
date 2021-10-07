const { Model, DataTypes } = require("sequelize");

class InfluencersUsed extends Model {
  static init(sequelize) {
    super.init(
      {
        influencer_id: DataTypes.INTEGER,
        player_id: DataTypes.INTEGER,
        opened_at: DataTypes.DATE,
        figure_id: DataTypes.INTEGER,
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
    this.belongsTo(models.Figure, { foreingKey: "figure_id", as: "figure" });
  }
}

module.exports = InfluencersUsed;
