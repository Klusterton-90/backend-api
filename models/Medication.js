import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Medication = sequelize.define('Medication', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  medicine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  diagnosis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.DATE,
    allowNull: false,
  }
},
{
    timestamps: false,
  },);


User.hasMany(Medication);
Medication.belongsTo(User);

export default Medication;
