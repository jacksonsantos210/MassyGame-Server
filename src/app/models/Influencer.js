const { Model, DataTypes } = require("sequelize");

class Influencer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.InfluencersToken, {
      foreingKey: "influencer_id",
      as: "tokens",
    });
  }
}

module.exports = Influencer;
