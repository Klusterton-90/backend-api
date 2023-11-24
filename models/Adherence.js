import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Medication from './Medication.js';
import Reminder from './Reminder.js'; 

const Adherence = sequelize.define('Adherence', {
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  adherenceStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
  },
},{
  timestamps: false
});

User.hasMany(Adherence);
Adherence.belongsTo(User);
Medication.hasMany(Adherence);
Adherence.belongsTo(Medication);
Reminder.hasMany(Adherence);
Adherence.belongsTo(Reminder);

export default Adherence;
