// src/layouts/AppProviders.tsx
'use client';

import type { ReactNode } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '@styles/theme';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
