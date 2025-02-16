import { Request, Response } from "express";
import { ILoginUser, IRegisUser, IUser } from "../types/data";
const service = require("../services/userService");
interface CustomRequest extends Request {
  user?: { username: string };
}
const handleRegisUser = async (
  req: Request<{}, {}, IRegisUser>,
  res: Response
): Promise<Response> => {
  try {
    const data = await service.regisUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: -1,
      message: "Error from server!",
    });
  }
};
const handleLoginUser = async (
  req: Request<{}, {}, ILoginUser>,
  res: Response
): Promise<Response> => {
  try {
    const data = await service.loginUser(req.body);
    if (data && data.data) {
      res.cookie("access_token", data.data.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: -1,
      message: "Error from server!",
    });
  }
};

const handleListUserScore = async (req: Request, res: Response) => {
  try {
    const data = await service.listUserScore();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: -1,
      message: "Error from server!",
    });
  }
};

const handlePerformTaskAndUpdateScore = async (
  req: Request<{}, {}, { username: string; score: number }>,
  res: Response
): Promise<Response> => {
  try {
    const customReq = req as CustomRequest;
    const data = await service.performTaskAndUpdateScore(customReq);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: -1,
      message: "Error from server!",
    });
  }
};

module.exports = {
  handleRegisUser,
  handleLoginUser,
  handleListUserScore,
  handlePerformTaskAndUpdateScore,
};
