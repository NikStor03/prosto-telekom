'use client';

import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

import { LoginForm } from '@components/forms/Login';

export default function LoginPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: '#FFFFFF',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 1000,
              color: 'primary.main',
              letterSpacing: '-0.02em',
            }}
          >
            Sparrow
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
    </Box>
  );
}
