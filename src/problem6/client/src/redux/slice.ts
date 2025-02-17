import { createSlice } from "@reduxjs/toolkit";
interface IState {
  user: {
    id: number;
    username: string;
    score: number;
  };
}
const initialState: IState = {
  user: {
    id: 0,
    username: "",
    score: 0,
  },
};

export const userSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
