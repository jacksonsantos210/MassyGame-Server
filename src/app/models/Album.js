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
}

module.exports = Album;
