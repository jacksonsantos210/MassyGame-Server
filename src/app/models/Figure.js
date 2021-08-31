const { Model, DataTypes } = require("sequelize");

class Figure extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        coin: DataTypes.INTEGER,
        type: DataTypes.INTEGER,
        image: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Album, { foreingKey: "figure_id", as: "albums" });
    this.hasMany(models.FiguresType, { foreingKey: "type", as: "types" });
    this.hasMany(models.Stand, { foreingKey: "figure_id", as: "stands" });
    this.hasMany(models.Premier, { foreingKey: "figure_id", as: "premiers" });
    this.hasMany(models.InfluencersToken, {
      foreingKey: "figure_id",
      as: "influencers",
    });
  }
}

module.exports = Figure;
