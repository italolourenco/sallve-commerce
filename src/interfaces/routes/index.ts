import { Router } from "express";

import { CartRouter } from "./CartRouter";
import { ProductRouter } from "./ProductRouter";
import { SwaggerRouter } from "./SwaggerRouter";

const routes = Router();

routes.use("/cart", new CartRouter().router);
routes.use("/docs", new SwaggerRouter().router);
routes.use("/products", new ProductRouter().router);

export default routes;
