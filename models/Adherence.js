import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Medication from './Medication.js';

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

export default Adherence;
