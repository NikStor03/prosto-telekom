import { LoginRequest, RegisterRequest, TokenResponse } from '@interfaces/auth';

import { apiClient } from '@libs/axios/axios';

export const authApi = {
  login: (payload: LoginRequest) =>
    apiClient.post<TokenResponse>('/auth/login', payload),

  register: (payload: RegisterRequest) =>
    apiClient.post<TokenResponse>('/auth/register', payload),
};
