import { Server } from "node:http";
import { Server as SocketIO } from "socket.io";
require("dotenv").config();
let io: SocketIO;
const socket = (server: Server) => {
  io = new SocketIO(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });
  io.on("connection", (socket: any) => {
    console.log("User connected: ", socket.id);
    socket.on("disconnected", () => {
      console.log("A user disconnected");
    });
  });
};
export { io };
export default socket;
