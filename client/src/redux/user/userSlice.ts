import { createSlice } from "@reduxjs/toolkit";
import type { TUser } from "../../type/user.type";

type TUserState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TUserState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {setUser, logOut} = userSlice.actions;
export default userSlice.reducer;
