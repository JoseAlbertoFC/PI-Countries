const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      season: {
        type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring"),
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdInDB: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
