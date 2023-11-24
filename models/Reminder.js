import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Medication from './Medication.js';

const Reminder = sequelize.define('Reminder', {
    reminderTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
  },{
    timestamps: false
  });
  
User.hasMany(Reminder);
Reminder.belongsTo(User);
Medication.hasMany(Reminder);
Reminder.belongsTo(Medication);
  

export default Reminder;
