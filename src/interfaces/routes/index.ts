import { Router } from "express";

import { CartRouter } from "./CartRouter";
import { SwaggerRouter } from "./SwaggerRouter";

const routes = Router();

routes.use("/cart", new CartRouter().router);
routes.use("/docs", new SwaggerRouter().router);

export default routes;
