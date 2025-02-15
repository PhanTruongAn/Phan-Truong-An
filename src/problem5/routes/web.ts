import express from "express";
const resourceController = require("../controllers/resourceController");
const router = express.Router();
const initWebRoutes = (app: any) => {
  router.post("/resources", resourceController.handleCreate);
  router.get("/resources", resourceController.handleList);
  router.get("/resources/:id", resourceController.handleGetDetail);
  router.put("/resources/:id", resourceController.handleUpdate);
  router.delete("/resources/:id", resourceController.handleDelete);

  return app.use("/", router);
};
export default initWebRoutes;
