import { createSlice } from "@reduxjs/toolkit";
import type { TUser } from "../../type/user.type";

type TUserState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TUserState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const {setUser, logOut} = userSlice.actions;
export default userSlice.reducer;
