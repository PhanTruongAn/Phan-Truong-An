import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import initWebRoutes from "./routes/web";
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Start server
const PORT = process.env.PORT || 8080;
initWebRoutes(app);
app.listen(PORT, () => {
  console.log(">>>Backend is running port = " + PORT);
});
