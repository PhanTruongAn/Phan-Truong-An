import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connectDB";

// Define model User
export const User = sequelize.define("User", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.NUMBER,
    defaultValue: 0,
  },
});
