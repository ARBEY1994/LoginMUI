import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("login", async ({ user, password }) => {
  const response = await axios.post(
    "https://pbakxq15qi.execute-api.us-west-2.amazonaws.com/testing",
    { user, password }
  );

  console.log("aquiiii", response);
  return response.data;
});

export const getData = createAsyncThunk(
  "getData",
  async ({ user, password }) => {
    const response = await axios.get(
      `https://pbakxq15qi.execute-api.us-west-2.amazonaws.com/testing?user=${user}&password=${password}`
    );

    console.log("GET", response);
    return response.data;
  }
);

const token = localStorage.getItem("token");

const initialState = {
  user: null,
  status: "idle",
  error: null,
  isAuthenticated: token ? true : false,
  token: token || null,
  data: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.error = null;
        state.isAuthenticated = true;
        state.token = action.payload;
        console.log("token:", state.token);
        localStorage.setItem("token", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.token = null;
      })
      //------//
      .addCase(getData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default loginSlice;

export const selectUser = (state) => state.login.user;
export const selectGetData = (state) => state.login.data;

export const selectLoginStatus = (state) => state.login.status;

export const selectLoginError = (state) => state.login.error;
export const selectIsAuthenticated = (state) => state.login.isAuthenticated;

export const selectIsLoading = createSelector(
  selectLoginStatus,
  (status) => status === "loading"
);
export const { logout } = loginSlice.actions;
