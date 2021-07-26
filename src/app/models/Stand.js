const { Model, DataTypes } = require("sequelize");

class Stand extends Model {
  static init(sequelize) {
    console.log("APP-> Model: Stand, has been initialized");
    super.init(
      {
        player_id: DataTypes.INTEGER,
        album_id: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        sold: DataTypes.BOOLEAN,
        sold_when: DataTypes.INTEGER,
        sold_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Album, {
      foreingKey: "album_id",
      as: "album",
    });
    // this.hasMany(models.Album, { foreingKey: "album_id", as: "stands_album" });
  }
}

module.exports = Stand;
