import * as typeorm from "typeorm";

import { IDbManager } from "../../interfaces/db/IDbManager";
import { DbManagerTypeOrm } from "../orm/DbManagerTypeOrm";

export class DbManagerFactory {
  private static instance: DbManagerFactory;
  private orm = typeorm;

  static getInstance(): DbManagerFactory {
    if (!DbManagerFactory.instance) {
      DbManagerFactory.instance = new DbManagerFactory();
    }

    return DbManagerFactory.instance;
  }

  public createDbManager(): IDbManager {
    return new DbManagerTypeOrm();
  }
}
