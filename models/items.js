"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    static associate(models) {
      this.belongsTo(models.Projects, {
        foreignKey: "projectId",
      });
    }
  }
  Items.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      itemName: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      quantity: { type: DataTypes.INTEGER },
      unitCost: { type: DataTypes.DOUBLE },
      totalCost: { type: DataTypes.DOUBLE },
    },
    {
      sequelize,
      modelName: "Items",
      timestamps: true,
    }
  );
  return Items;
};
