'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Routes } from '@constants/routes';
import { setCookie } from '@helpers/cookies';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {
  Box,
  Button,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import type { LoginRequest } from '@interfaces/auth';

import { useAppDispatch, useAppSelector } from '@libs/redux/hooks';
import { loginThunk } from '@libs/redux/slices/auth';

export function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await dispatch(loginThunk(formData)).unwrap();
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
      noValidate
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
    >
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <TextField
        name="email"
        type="email"
        placeholder="Email address"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="action" />
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
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary" component="span">
          Don't have an account?{' '}
        </Typography>
        <Link
          href="/registration"
          underline="none"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Sign up
        </Link>
      </Box>
    </Box>
  );
}
