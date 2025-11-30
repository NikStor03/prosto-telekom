import { LoginRequest, RegisterRequest, TokenResponse } from '@interfaces/auth';

import { api } from '@libs/axios/axios';

export const authApi = {
  login: (payload: LoginRequest) => {
    const formData = new URLSearchParams();
    formData.append('username', payload.email);
    formData.append('password', payload.password);
    formData.append('grant_type', 'password');
    formData.append('scope', '');
    formData.append('client_id', '');
    formData.append('client_secret', '');

    return api.post<TokenResponse>('/api/v1/auth/token', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },

  // Реєстрація приймає JSON
  register: (payload: RegisterRequest) =>
    api.post<{ email: string; id: number; is_active: boolean }>(
      '/api/v1/auth/register',
      {
        email: payload.email,
        password: payload.password,
      }
    ),
};
