import { DbManagerTypeOrm } from "../orm/DbManagerTypeOrm";
import { IDbManager } from "./IDbManager";

export class DbManagerFactory {
  private static instance: DbManagerFactory;

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
