import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

import { authApi } from '@api/auth';

import { LoginRequest, RegisterRequest } from '@interfaces/auth';

interface AuthState {
  accessToken?: string;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  accessToken: undefined,
  loading: false,
  error: '',
};

export const registerThunk = createAsyncThunk<
  any,
  RegisterRequest,
  { rejectValue: string }
>('auth/register', async (payload) => {
  const response = await authApi.register(payload);
  return response.data;
});

export const loginThunk = createAsyncThunk<
  any,
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (payload) => {
  const response = await authApi.login(payload);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.accessToken = undefined;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.loading = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.loading = false;
      });

    builder.addMatcher(isPending(registerThunk, loginThunk), (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addMatcher(isRejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown error';
    });
  },
});

export const { clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
