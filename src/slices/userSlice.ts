import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

type userState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  error: null | string;
  loginUserRequest: boolean;
};

const initialState: userState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  error: null,
  loginUserRequest: false
};

export const getUser = createAsyncThunk('user/getApi', getUserApi);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, password, name }: TRegisterData) => {
    const response = await registerUserApi({ email, password, name });

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/logIn',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const response = await loginUserApi({ email, password });

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

export const logoutUser = createAsyncThunk('user/logOut', async () => {
  const response = await logoutApi();

  deleteCookie('accessToken');
  localStorage.clear();

  return response;
});

export const updateUser = createAsyncThunk('user/undate', updateUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthenticated = false;
        state.error = null;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message ?? null;
        state.user = null;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.error = null;
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isAuthenticated = false;
        state.error = null;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message ?? null;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.loginUserRequest = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.error = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.error = action.error.message ?? null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.loginUserRequest = false;
      });
  }
});

export const { authChecked, clearError } = userSlice.actions;

export const checkUserAuth = createAsyncThunk(
  'user/check',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);
