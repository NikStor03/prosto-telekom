// src/components/modals/CreateCompanyModal.tsx
'use client';

import { useState } from 'react';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';

interface CreateCompanyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CompanyFormData) => void;
}

export interface CompanyFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
}

export function CreateCompanyModal({
  open,
  onClose,
  onSubmit,
}: CreateCompanyModalProps) {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    phone: '',
    email: '',
    location: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      phone: '',
      email: '',
      location: '',
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
        }}
      >
        <Box sx={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1C1D' }}>
          Create Company
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            pt: 1,
          }}
        >
          <TextField
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon sx={{ color: '#616061', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="phone"
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon sx={{ color: '#616061', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
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
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon sx={{ color: '#616061', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{ mt: 1 }}
          >
            Create Company
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
