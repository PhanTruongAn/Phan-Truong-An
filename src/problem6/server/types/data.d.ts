export interface IRegisUser {
  username: string;
  password: string;
}
export interface ILoginUser {
  username: string;
  password: string;
}
export interface IUser {
  id: number;
  username: string;
  score: number;
}
export interface IUserWithToken extends IUser {
  access_token?: string;
}
export interface IApiResponse<T = null> {
  status: "success" | "failure";
  message: string;
  data: T;
}
