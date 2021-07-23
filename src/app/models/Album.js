const { Model, DataTypes } = require("sequelize");
/* const Figure = require("./Figure");
const Player = require("./Player"); */

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

    //;
  }
  /* 
  static associateFigure(model) {
    this.belongsTo(model, { foreingKey: "figures_id", as: "figures" });
  }

  static associatePlayer(model) {
    this.belongsTo(model, { foreingKey: "players_id", as: "players" });
  } */
}

module.exports = Album;
