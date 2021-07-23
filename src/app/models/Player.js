const { Model, DataTypes } = require("sequelize");
/* const Album = require("./Album"); */

class Player extends Model {
  static init(sequelize) {
    console.log("APP-> Model: Player, has been initialized");
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        birth: DataTypes.DATE,
        country: DataTypes.STRING,
        provincy: DataTypes.STRING,
        city: DataTypes.STRING,
        address: DataTypes.STRING,
        language: DataTypes.STRING,
        photo: DataTypes.STRING,
        audio_play: DataTypes.BOOLEAN,
        rules_accept: DataTypes.BOOLEAN,
        score: DataTypes.INTEGER,
        password: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  /* 
  static associateAlbum(model) {
    this.hasMany(model, { foreingKey: "players_id", as: "players" });
  } */
}

module.exports = Player;
