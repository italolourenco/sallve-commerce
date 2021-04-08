import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Sallve Commerce",
      version: "1.0.0",
      contact: {
        name: "Italo Lourenço",
        email: "italolt10@gmail.com",
      },
    },
  },
  apis: ["../**/*.ts"],
};

export class SwaggerRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configRouter();
  }

  private configRouter(): void {
    const specs = swaggerJSDoc(options);
    this.router.use("/", swaggerUi.serve);
    this.router.get("/", swaggerUi.setup(specs, { explorer: true }));
  }
}
