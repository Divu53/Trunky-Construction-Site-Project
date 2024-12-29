"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photos extends Model {
    static associate(models) {
      this.belongsTo(models.Projects, {
        foreignKey: "projectId",
      });
    }
  }
  Photos.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      url: { type: DataTypes.STRING, allowNull: false },
      fileType: { type: DataTypes.STRING },
      fileSize: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Photos",
      timestamps: true,
    }
  );
  return Photos;
};
