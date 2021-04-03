import { DbManagerFactory } from "../db/DbManagerFactory";

export default {
  async execute(): Promise<any> {
    try {
      const dbManagerFactory = DbManagerFactory.getInstance();
      const db = dbManagerFactory.createDbManager();

      await db.createConnection();
      console.log("Connection to DB has been succefuul");
    } catch (error) {
      console.log("Unable to connect to dabase:", error);
    }
  },
};
