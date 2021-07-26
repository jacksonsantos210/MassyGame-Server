const { Model, DataTypes } = require("sequelize");
class Album extends Model {
  static init(sequelize) {
    console.log("APP-> Model: Album, has been initialized");
    super.init(
      {
        player_id: DataTypes.INTEGER,
        figure_id: DataTypes.INTEGER,
        origin: DataTypes.STRING,
        pasted: DataTypes.BOOLEAN,
        sold: DataTypes.BOOLEAN,
        sale: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Player, { foreingKey: "player_id", as: "player" });
    this.belongsTo(models.Figure, { foreingKey: "figure_id", as: "figure" });
    this.hasMany(models.Stand, { foreingKey: "album_id", as: "stands" });
    //this.belongsTo(models.Stand, { foreingKey: "figure_id", as: "stands" });
  }
}

module.exports = Album;
