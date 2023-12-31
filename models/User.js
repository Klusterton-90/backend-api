import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import HealthProfessional from "./HealthProfessional.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    timestamps: false,
  }
);

HealthProfessional.hasMany(User);
User.belongsTo(HealthProfessional);


export default User;
