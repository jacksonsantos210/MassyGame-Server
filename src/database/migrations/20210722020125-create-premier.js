"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("premiers", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      player_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "players", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      hash: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      opened: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      figure1_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "figures", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      figure2_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "figures", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      figure3_id: {
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
    await queryInterface.dropTable("developers_sessions");
  },
};
