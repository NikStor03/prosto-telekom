'use client';

import { Box, Container, Typography } from '@mui/material';

import { RegistrationForm } from '@components/forms/Registration';

export default function RegistrationPage() {
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
            backgroundColor: '#FFFFFF',
            borderRadius: 3,
            boxShadow:
              '0 1px 4px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.12)',
            padding: { xs: 4, sm: 6 },
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography component="h1" variant="h4" sx={{ mb: 1 }}>
              Sign up
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create your account to get started.
            </Typography>
          </Box>

          <RegistrationForm />
        </Box>
      </Container>
    </Box>
  );
}
