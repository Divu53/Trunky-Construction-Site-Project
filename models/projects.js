"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: "userId",
      });

      this.hasMany(models.Items, {
        foreignKey: "projectId",
      });

      this.hasMany(models.Photos, {
        foreignKey: "projectId",
      });
    }
  }
  Projects.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      projectName: { type: DataTypes.STRING, allowNull: false },
      startDate: { type: DataTypes.DATE },
      expectedCompletionDate: { type: DataTypes.DATE },
      description: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      modelName: "Projects",
      timestamps: true,
    }
  );
  return Projects;
};
