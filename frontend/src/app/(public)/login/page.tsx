'use client';

import { Box, Container, Typography } from '@mui/material';

import { Login } from '@components/forms/Login';

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography component="h1" variant="h4">
          Log in
        </Typography>

        <Login />
      </Box>
    </Container>
  );
}
