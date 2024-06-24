import { createSlice } from "@reduxjs/toolkit";

const initialSearchState = {
  searchBarActive: true,
  resOfSearch: false,
  //   loggedIn: false,
  //   userData: {},
  //   isAdmin: false,
};

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState: initialSearchState,
  reducers: {
    cheangeSearchBarToActive: (state) => {
      state.searchBarActive = false;
    },
    SearchBarNotActive: (state) => {
      state.searchBarActive = true;
    },
    showResOfSearch: (state) => {
      state.resOfSearch = true;
    },
    hideResOfSearch: (state) => {
      state.resOfSearch = false;
    },
    // logOut: (state) => {
    //   state.loggedIn = false;
    //   localStorage.clear();
    //   state.userData = {};
    // },
    // logIn: (state) => {
    //   state.loggedIn = true;
    // },
    // admin: (state) => {
    //   state.isAdmin = true;
    // },
    // notAdmin: (state) => {
    //   state.isAdmin = false;
    // },
    // userEmail: (state, email) => {
    //   state.userData.email = email.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  cheangeSearchBarToActive,
  showResOfSearch,
  SearchBarNotActive,
  hideResOfSearch,
} = searchBarSlice.actions;

export default searchBarSlice.reducer;
