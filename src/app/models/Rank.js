const { Model, DataTypes } = require("sequelize");

class Rank extends Model {
  static init(sequelize) {
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
