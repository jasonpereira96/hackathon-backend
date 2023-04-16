
const { DataTypes } = require('sequelize');

const PumpRecord = {
  // Model attributes are defined here
  action: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

module.exports = PumpRecord;
