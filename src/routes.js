import { Router } from "express";
import customers from "./app/controllers/CustomersController";

const routes = new Router();

routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.put("/customers", customers.create);
routes.post("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

export default routes;
