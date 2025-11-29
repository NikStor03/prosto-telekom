'use client';

import { Box, Container, Typography } from '@mui/material';

import { LoginForm } from '@components/forms/Login';

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 3,
            boxShadow: 3,
            padding: { xs: 4, sm: 6 },
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography component="h1" variant="h4" sx={{ mb: 1 }}>
              Sign in
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Log in to your account to continue.
            </Typography>
          </Box>

          <LoginForm />
        </Box>
      </Container>
    </Box>
  );
}
