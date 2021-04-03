import * as dotenv from "dotenv";

const envFound = dotenv.config();

export default {
  port: process.env.PORT || 5000,
  database: {
    type: process.env.TYPE_CONNECTION,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
};
