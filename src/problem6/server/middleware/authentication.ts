import { NextFunction, Request, Response } from "express";

require("dotenv").config();
const jwtAction = require("../middleware/jwtAction");
//Non-secure path
const white_list = ["/", "/login"];
interface CustomRequest extends Request {
  user?: { username: string };
}
export const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (white_list.includes(req.path)) {
    return next();
  } else {
    setTimeout(() => {
      const cookie = req.cookies;
      const token = cookie.access_token;

      if (!token) {
        return res.status(401).json({
          status: 401,
          message: "You are not logged in!",
        });
      } else {
        const token = cookie.access_token;
        const decoded = jwtAction.verifyToken(token);
        req.user = decoded;
        if (decoded) {
          next();
        } else {
          return res.status(401).json({
            status: 401,
            message: "Unauthorized!",
          });
        }
      }
    }, 1000);
  }
};

module.exports = { authentication };
