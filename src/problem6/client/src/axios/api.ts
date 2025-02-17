import { IApiResponse, IUserLogin, IUserScore } from "../types/backend";
import axiosClient from "./config";
export async function fetchUserScore(): Promise<IApiResponse<IUserScore[]>> {
  const response = await axiosClient.get<IApiResponse<IUserScore[]>>("/users");
  return response.data;
}
export async function login(
  username: string,
  password: string
): Promise<IApiResponse<IUserLogin>> {
  const response = await axiosClient.post<IApiResponse<IUserLogin>>("/login", {
    username,
    password,
  });
  return response.data;
}

export async function register(
  username: string,
  password: string
): Promise<IApiResponse<IUserLogin>> {
  const response = await axiosClient.post<IApiResponse<IUserLogin>>(
    "/register",
    {
      username,
      password,
    }
  );
  return response.data;
}

export async function doTask(
  username: string,
  score: number
): Promise<IApiResponse<null>> {
  const response = await axiosClient.put<IApiResponse<null>>("/users", {
    username,
    score,
  });
  return response.data;
}
