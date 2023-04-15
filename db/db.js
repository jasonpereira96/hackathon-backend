const { Sequelize } = require('sequelize');
require('dotenv').config();
const UserModel = require("./../models/User");
const PhReadingModel = require("./../models/PhReading");
const WaterReadingModel = require("./../models/WaterReading");

const host = process.env.PGHOST;
const database = process.env.DATABASE;
const user = process.env.PGUSER;
const password = process.env.PASSWORD;
const connectionString = process.env.CONNECTION_STRING;

console.log(`HOST: 123 ${host}`);

const config = {
    connectionString,
    dialect: 'postgres',
    // Beware! The ssl object is overwritten when parsing the connectionString
    ssl123: {
      rejectUnauthorized: false,
    //   ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
    },
  }

  const sequelize = new Sequelize(connectionString);

// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize(database, user, password, {
//   host: host,
//   dialect: "postgres"/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });

// psql 'postgres://jasonpereira96:mJg4vAxaOUC5@ep-round-grass-867131.us-east-2.aws.neon.tech/neondb'


const User = sequelize.define("User", UserModel);
const PhReading = sequelize.define("PhReading", PhReadingModel);
const WaterReading = sequelize.define("WaterReading", WaterReadingModel);

module.exports = {
    sequelize,
    User,
    PhReading,
    WaterReading
};