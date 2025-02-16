import express from "express";
import { authentication } from "../middleware/authentication";
const userController = require("../controllers/userController");
const router = express.Router();
const initWebRoutes = (app: any) => {
  router.all("*", authentication);
  router.post("/users", userController.handleRegisUser);
  router.post("/login", userController.handleLoginUser);
  router.get("/users", userController.handleListUserScore);
  // router.get("/resources/:id", resourceController.handleGetDetail);
  router.put("/users", userController.handlePerformTaskAndUpdateScore);
  // router.delete("/resources/:id", resourceController.handleDelete);

  return app.use("/", router);
};
export default initWebRoutes;
