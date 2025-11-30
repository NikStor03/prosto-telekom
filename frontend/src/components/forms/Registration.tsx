'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Routes } from '@constants/routes';
import { setCookie } from '@helpers/cookies';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import { RegisterRequest } from '@interfaces/auth';

import { useAppDispatch, useAppSelector } from '@libs/redux/hooks';
import { registerThunk } from '@libs/redux/slices/auth';

export function RegistrationForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterRequest>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field: keyof RegisterRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(registerThunk(formData)).unwrap();
      await setCookie({
        name: 'access_token',
        value: result.access_token,
        maxAge: 216000,
      });
      router.push(`${Routes.Home}`);
    } catch {}
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
    >
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => handleInputChange('firstName', e.target.value)}
        disabled={loading}
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon sx={{ color: '#616061', fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => handleInputChange('lastName', e.target.value)}
        disabled={loading}
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon sx={{ color: '#616061', fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        type="email"
        placeholder="Email address"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        disabled={loading}
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon sx={{ color: '#616061', fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        disabled={loading}
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ color: '#616061', fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        disabled={loading}
        sx={{ mt: 1 }}
      >
        {loading ? 'Creating account...' : 'Create account'}
      </Button>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary" component="span">
          Already have an account?{' '}
        </Typography>
        <Link
          href="/login"
          underline="none"
          sx={{
            fontSize: '0.9375rem',
            color: '#1264A3',
            fontWeight: 700,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Sign in
        </Link>
      </Box>
    </Box>
  );
}
