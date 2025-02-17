import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import initWebRoutes from "./routes/web";
import { Server } from "socket.io";
import { createServer } from "node:http";
import socket from "./configs/socket";
const cors = require("cors");

dotenv.config();
const app = express();
const server = createServer(app);
const cookieParser = require("cookie-parser");
const io = new Server(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Cors configs
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));
// Start server
const PORT = process.env.PORT || 8080;
initWebRoutes(app);
// Socket server
socket(server);
server.listen(process.env.PORT_SOCKET, () => {
  console.log(">>>>Socket running on port: " + process.env.PORT_SOCKET);
});
app.listen(PORT, () => {
  console.log(">>>Backend is running port = " + PORT);
});
