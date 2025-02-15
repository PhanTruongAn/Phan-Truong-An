import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connectDB";

// Khai báo model Major
export const Resource = sequelize.define("Resource", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
