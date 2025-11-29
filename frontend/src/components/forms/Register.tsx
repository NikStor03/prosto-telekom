// src/components/form/Registration.tsx
'use client';

import { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';

import { RegisterRequest } from '@interfaces/auth';

//type RegistrationFormData = {
//  firstName: string;
//  lastName: string;
//  email: string;
//  password: string;
//};

export function Registration() {
  const [formData, setFormData] = useState<RegisterRequest>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // later: validation + request
    console.log('Submitted data:', formData);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <TextField
        label="First name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Last name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
      />

      <Button type="submit" variant="contained">
        Sign up
      </Button>
    </Box>
  );
}
