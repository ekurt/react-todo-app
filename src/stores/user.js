import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { auth, providerGoogle } from "../config/firebase";

const LOCAL_STORAGE_USER = "todo-app-user";

export const loginAsync = createAsyncThunk("user/login", async () => {
  try {
    await signInWithPopup(auth, providerGoogle);
    return auth;
  } catch (error) {
    console.log(error);
  }
});

export const logoutAsync = createAsyncThunk("user/signOut", async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER)) ?? null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      const user = {
        id: action.payload.currentUser.uid,
        name: action.payload.currentUser.displayName,
        email: action.payload.currentUser.email,
        photo: action.payload.currentUser.photoURL,
      };
      state.user = user;
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.user = null;
      localStorage.setItem(LOCAL_STORAGE_USER, null);
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
