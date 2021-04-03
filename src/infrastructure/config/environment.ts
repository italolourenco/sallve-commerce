import * as dotenv from "dotenv";

const envFound = dotenv.config();

export default {
  port: process.env.PORT || 5000,
  database: {
    type: process.env.TYPE_CONNECTION,
    host: process.env.HOST,
    port: process.env.DBPORT,
    username: process.env.BDUSERNAME,
    password: process.env.BDPASSWORD,
    database: process.env.BDNAME,
  },
};
