import bodyParser from "body-parser";
import express, { Application, Request, Response, NextFunction } from "express";
import http from "http";

import routes from "../../interfaces/routes";
import config from "../config/environment";

export default class WebServer {
  public app: Application;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public static start(): WebServer {
    return new WebServer();
  }

  private config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        // eslint-disable-next-line no-param-reassign
        err.status = 404;
        next(err);
      }
    );
    const { port } = config;
    this.app.set("port", port);

    this.server = this.app.listen(port, () => {
      console.log("Express Routrer ins running on port", port);
    });
  }

  private routes() {
    this.app.use(routes);
  }
}
