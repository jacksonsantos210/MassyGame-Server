"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("influencers_useds", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "influencers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      player_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "players", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      opened_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      figure_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "figures", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("influencers_tokens");
  },
};
