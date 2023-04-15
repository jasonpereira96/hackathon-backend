const { DataTypes } = require('sequelize');

const WaterReading = {
  // Model attributes are defined here
  reading: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
};

module.exports = WaterReading;