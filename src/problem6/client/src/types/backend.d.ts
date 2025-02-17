export interface IUserScore {
  id: number;
  username: string;
  score: number;
}
export interface IUserLogin {
  username: string;
  password: string;
}
export interface IApiResponse<T = null> {
  status: "success" | "failure";
  message: string;
  data: T;
}
