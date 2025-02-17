import {
  IRegisUser,
  ILoginUser,
  IUserWithToken,
  IApiResponse,
  IUser,
} from "../types/data";
import bcrypt from "bcryptjs";
import { Request } from "express";
import socket from "../configs/socket";
import { io } from "../configs/socket";
interface CustomRequest extends Request {
  user?: { username: string };
}
const jwtAction = require("../middleware/jwtAction");
const { User } = require("../models/user");
// Salt Bcrypt
let salt = bcrypt.genSaltSync(10);

const hashPassword = (password: string) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const regisUser = async (
  data: IRegisUser
): Promise<IApiResponse<IUser | null>> => {
  const { password, username } = data;
  const result = await User.create({
    username: username,
    password: hashPassword(password),
  });
  const userData = result.get({ plain: true });

  return {
    status: "success",
    message: "Register successfully!",
    data: {
      id: userData.id,
      username: userData.username,
      score: userData.score,
    },
  };
};

const loginUser = async (
  data: ILoginUser
): Promise<IApiResponse<IUserWithToken | null>> => {
  const { username, password } = data;

  if (!username || !password) {
    return {
      status: "failure",
      message: "Please fill all information!",
      data: null,
    };
  }

  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (!user) {
    return {
      status: "failure",
      message: "Username not found!",
      data: null,
    };
  }
  if (user) {
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (comparePassword) {
      const payload = {
        username: user.username,
      };
      const accessToken = jwtAction.createToken(payload);

      return {
        status: "success",
        message: "Login successfully!",
        data: {
          id: user.id,
          username: user.username,
          score: user.score,
          access_token: accessToken,
        } as IUserWithToken,
      };
    } else {
      return {
        status: "failure",
        message: "Wrong password",
        data: null,
      };
    }
  }

  return {
    status: "failure",
    message: "User is not exist!",
    data: null,
  };
};

const listUserScore = async (): Promise<IApiResponse<IUser[] | null>> => {
  const results = await User.findAll({
    attributes: ["id", "username", "score"],
    order: [["score", "DESC"]],
    limit: 10,
  });
  if (results && results.length > 0) {
    return {
      status: "success",
      message: "Get all user score successfully!",
      data: results,
    };
  }
  return {
    status: "failure",
    message: "Don't have any user!",
    data: null,
  };
};

const sampleTask = async () => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(true), 2000);
  });
};

const performTaskAndUpdateScore = async (
  req: CustomRequest
): Promise<IApiResponse<null>> => {
  try {
    const { username, score } = req.body;
    if (req.user?.username !== username) {
      return {
        status: "failure",
        message: "You are not allowed to update another user's score.",
        data: null,
      };
    }
    const isTaskCompleted = await sampleTask();

    if (!isTaskCompleted) {
      return {
        status: "failure",
        message: "Task not completed, score not updated.",
        data: null,
      };
    }
    const [updatedCount] = await User.update(
      { score: score },
      { where: { username: username } }
    );

    if (updatedCount > 0) {
      const updatedScores = await listUserScore();
      io.emit("allScoresUpdated", updatedScores.data);
      return {
        status: "success",
        message: "Score updated successfully!",
        data: null,
      };
    } else {
      return {
        status: "failure",
        message: "User not found or score not updated.",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error updating score:", error);
    return {
      status: "failure",
      message: "An error occurred while updating score.",
      data: null,
    };
  }
};

module.exports = {
  regisUser,
  loginUser,
  listUserScore,
  performTaskAndUpdateScore,
};
