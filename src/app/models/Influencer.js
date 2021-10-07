const { Model, DataTypes } = require("sequelize");

class Influencer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        token: DataTypes.STRING,
        indications: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.InfluencersUsed, {
      foreingKey: "influencer_id",
      as: "tokens",
    });
  }
}

module.exports = Influencer;
