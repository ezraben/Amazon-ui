import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  loggedIn: false,
  userData: {},
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    // logOut(state) {
    //   state.loggedIn = false;
    // },
    logOut: (state) => {
      state.loggedIn = false;
      localStorage.clear();
      state.userData = {};
    },
    logIn: (state) => {
      state.loggedIn = true;
    },
    admin: (state) => {
      state.isAdmin = true;
    },
    notAdmin: (state) => {
      state.isAdmin = false;
    },
    userEmail: (state, email) => {
      state.userData.email = email.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logOut, logIn, userEmail, admin, notAdmin } = authSlice.actions;

export default authSlice.reducer;
