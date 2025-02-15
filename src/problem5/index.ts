import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import initWebRoutes from "./routes/web";
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start server
const PORT = process.env.PORT || 8080;
initWebRoutes(app);
app.listen(PORT, () => {
  console.log(">>>Backend is running port = " + PORT);
});
