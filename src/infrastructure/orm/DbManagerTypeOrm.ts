import * as dotenv from "dotenv";
import { createConnection, Connection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import config from "../config/environment";
import { IDbManager } from "../db/IDbManager";

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Could't find .env file");
}
export class DbManagerTypeOrm implements IDbManager {
  public async createConnection(): Promise<Connection> {
    const ssl = config.database.ssl === "true";
    const sslJsonConfig = JSON.parse(config.database.sslConfig);
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
      entities: ["./src/infrastructure/orm/entity/*.ts"],
      ssl,
      extra: sslJsonConfig,
    };

    const connection = await createConnection(connectionOptions);

    return connection;
  }
}
