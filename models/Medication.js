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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reminders: {
    type: DataTypes.ARRAY(DataTypes.TIME),
    allowNull: true
  },
  reminderStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ongoing',
  }
},
{
    timestamps: false,
  },);


User.hasMany(Medication);
Medication.belongsTo(User);

export default Medication;
