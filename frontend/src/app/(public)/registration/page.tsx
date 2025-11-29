// app/(public)/registration/page.tsx
'use client';

import { Box, Container, Typography } from '@mui/material';

import { Registration } from '@components/forms/Register';

export default function RegistrationPage() {
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
          Sign up
        </Typography>

        <Registration />
      </Box>
    </Container>
  );
}
