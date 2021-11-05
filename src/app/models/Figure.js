const { Model, DataTypes } = require("sequelize");

class Figure extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        coin: DataTypes.INTEGER,
        type_id: DataTypes.INTEGER,
        image: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.FiguresType, { foreingKey: "type_id", as: "type" });

    //this.hasOne(models.FiguresType, { foreingKey: "type_id", as: "types" });

    this.hasMany(models.Album, { foreingKey: "figure_id", as: "albums" });
    this.hasMany(models.Stand, { foreingKey: "figure_id", as: "stands" });
    this.hasMany(models.InfluencersUsed, {
      foreingKey: "figure_id",
      as: "influencers",
    });
  }
}

module.exports = Figure;
