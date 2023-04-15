const { DataTypes } = require('sequelize');

const PhReading = {
  // Model attributes are defined here
  reading: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
};

module.exports = PhReading;