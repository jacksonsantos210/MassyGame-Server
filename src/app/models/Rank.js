const { Model, DataTypes } = require("sequelize");

class Rank extends Model {
  static init(sequelize) {
    console.log("APP-> Model: Rank, has been initialized");
    super.init(
      {
        coin: DataTypes.INTEGER,
        player_id: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Rank;
