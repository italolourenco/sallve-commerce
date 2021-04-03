import * as dotenv from "dotenv";
import { createConnection, Connection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { IDbManager } from "../../interfaces/db/IDbManager";
import config from "../config/environment";

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Could't find .env file");
}
export class DbManagerTypeOrm implements IDbManager {
  public async createConnection(): Promise<Connection> {
    const connectionOptions: PostgresConnectionOptions = {
      type: "postgres",
      host: config.database.host,
      // eslint-disable-next-line radix
      port: Number.parseInt(config.database.port),
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      logging: true,
      migrationsRun: true,
      migrations: ["./src/infrastructure/orm/migrations/*.ts"],
      ssl: true,
      extra: {
        ssl: { rejectUnauthorized: false },
      },
    };

    console.log(connectionOptions);

    const connection = await createConnection(connectionOptions);
    console.log(connection.migrations);

    return connection;
  }
}
