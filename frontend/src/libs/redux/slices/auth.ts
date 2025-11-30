import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

import { authApi } from '@api/auth';

import { LoginRequest, RegisterRequest, TokenResponse } from '@interfaces/auth';

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
  TokenResponse,
  RegisterRequest,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const response = await authApi.register(payload);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Registration failed';
    return rejectWithValue(message);
  }
});

export const loginThunk = createAsyncThunk<
  TokenResponse,
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const response = await authApi.login(payload);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Login failed';
    return rejectWithValue(message);
  }
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
        state.error = '';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.loading = false;
        state.error = '';
      });

    builder.addMatcher(isPending(registerThunk, loginThunk), (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addMatcher(
      isRejected(registerThunk, loginThunk),
      (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Unknown error';
      }
    );
  },
});

export const { clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
