'use client';

import { Box, Button, Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Typography variant="h3" component="h1">
          Main page
        </Typography>

        <Typography variant="body1">Base shablona</Typography>

        <Button variant="contained" color="primary">
          Button
        </Button>
      </Box>
    </Container>
  );
}
