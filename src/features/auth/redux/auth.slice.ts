import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AuthState, FromValue } from '../types/auth.types';
import { authApi } from '../apis/auth.api';

export const postLogin = createAsyncThunk(
  'auth/postLogin',
  async (data: FromValue, { rejectWithValue }) => {
    try {
      const response = await authApi.signIn(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.logout();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.refreshAccessToken();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)


export const getCurrentUser = createAsyncThunk(
  'auth/cart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.currentUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: AuthState = {
  accessToken: '',
  isAuthenticated: false,
  cartItemLength: 0,
  wishlistItemLength: 0,
  userInfo: null,
  userId: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.userInfo = action.payload.userData;
        state.cartItemLength = action.payload.cartLength;
        state.wishlistItemLength = action.payload.wishlistLength;
        state.userId = action.payload.userData.id;
      })
      .addCase(postLogin.rejected, (state) => {
        state.accessToken = '';
        state.isAuthenticated = false;
        state.cartItemLength = 0;
        state.userInfo = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.cartItemLength = action.payload.rs?.cart?.length;
        state.userInfo = action.payload.rs;
        state.userId = action.payload.rs.id;
        state.wishlistItemLength = action.payload.rs.wishlist.length;
      })
      // .addCase(refreshAccessToken.fulfilled, (state, action) => {
      //   state.accessToken = action.payload.accessToken;
      //   console.log(action.payload.accessToken)
      // })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = '';
        state.isAuthenticated = false;
        state.cartItemLength = 0;
        state.wishlistItemLength = 0;
        state.userInfo = null;
        state.userId = '';
      });
  },
});

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'isAuthenticated', 'cartItemLength', 'userId', 'wishlistItemLength'],
};

export const authReducer = persistReducer(authConfig, authSlice.reducer);
