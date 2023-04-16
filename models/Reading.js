// PH:f, PH_Low:f, PH_High:f, Overflow:b, Underflow:b, Turbulance:b, Temp:f, Humidity:f, Pump status:b (spcial case), 
// Pump Interval:sec, minutes after sunset:int, minutes before sunrise:int

const { DataTypes } = require('sequelize');

const Reading = {
  // Model attributes are defined here
  ph: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  phLow: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  phHigh: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  overflow: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  underflow: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  turbulence: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  temperature: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  humidity: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  pumpStatus: {
    // special case: 0, 1, 2
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  pumpInterval: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  // gonna recive 0 or 1 from the picow
  lightStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  lightDurationMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }

};

module.exports = Reading;
