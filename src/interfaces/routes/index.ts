import { response, Router } from "express";

import { CartRouter } from "./CartRouter";
import { ProductRouter } from "./ProductRouter";
import { SwaggerRouter } from "./SwaggerRouter";

const routes = Router();

routes.use("/cart", new CartRouter().router);
routes.use("/docs", new SwaggerRouter().router);
routes.use("/products", new ProductRouter().router);

routes.get("/", (request, response) => {
  return response.redirect("/docs");
});

export default routes;
