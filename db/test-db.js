// Do not expose your Neon credentials to the browser
// .env
/*const PGHOST='ep-round-grass-867131.us-east-2.aws.neon.tech'
const PGDATABASE='neondb'
const PGUSER='jasonpereira96'
const PGPASSWORD='mJg4vAxaOUC5'


// pages/api/hello_worlds.js
const postgres = require("postgres");

const conn = postgres({
    host                 : PGHOST,            // Postgres ip address[s] or domain name[s]
  port                 : 5432,          // Postgres server port[s]
  database             : PGDATABASE,            // Name of database to connect to
  username             : PGUSER,            // Username of database user
  password             : PGPASSWORD, 
});

console.log(conn);

function selectAll() {
  return conn.query("SELECT * FROM hello_world");
}

selectAll();*/

const User = require("./../models/User");

const { sequelize } = require("./db");

async function test() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return;
    }

    await sequelize.sync();

    console.log("Sync successful");

    sequelize.close();

}


test();