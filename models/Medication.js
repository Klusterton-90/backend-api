import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Medication = sequelize.define('Medication', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
  },
},
{
    timestamps: false,
  },);


User.hasMany(Medication);
Medication.belongsTo(User);

export default Medication;
