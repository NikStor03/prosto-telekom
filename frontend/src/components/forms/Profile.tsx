'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SaveIcon from '@mui/icons-material/Save';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

type EditingField = 'name' | 'email' | 'phone' | 'all' | null;

export default function ProfileComponent() {
  const router = useRouter();
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [profile, setProfile] = useState<ProfileData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+421 123 456 789',
  });

  const [tempValue, setTempValue] = useState<Partial<ProfileData>>({});

  const handleEditClick = (field: EditingField) => {
    setEditingField(field);
    if (field === 'all') {
      setTempValue({ ...profile });
    } else if (field === 'name') {
      setTempValue({
        firstName: profile.firstName,
        lastName: profile.lastName,
      });
    } else if (field === 'email') {
      setTempValue({ email: profile.email });
    } else if (field === 'phone') {
      setTempValue({ phone: profile.phone });
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue({});
  };

  const handleSave = () => {
    setProfile((prev) => ({ ...prev, ...tempValue }));
    setEditingField(null);
    setTempValue({});
  };

  const handleBackClick = () => router.back();

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;
  const isEditingAll = editingField === 'all';

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <IconButton
          onClick={handleBackClick}
          sx={{ color: 'primary.contrastText' }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={500} color="primary.contrastText">
          Profile
        </Typography>
      </Box>

      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Card
          sx={{ borderRadius: 2, overflow: 'visible', position: 'relative' }}
        >
          <Box
            sx={{
              height: 120,
              background:
                'linear-gradient(135deg, primary.main, primary.light)',
              position: 'relative',
            }}
          />

          <Box sx={{ px: 3, pb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: -6,
                mb: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  fontSize: '2rem',
                  border: '4px solid',
                  borderColor: 'background.paper',
                  boxShadow: 2,
                  backgroundColor: 'primary.main',
                }}
              >
                {initials}
              </Avatar>
            </Box>

            <Box sx={{ mb: 3, textAlign: 'center' }}>
              {editingField !== 'name' && !isEditingAll ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <Typography variant="h5" fontWeight={600}>
                    {fullName}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick('name')}
                  >
                    <EditIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              ) : editingField === 'name' || isEditingAll ? (
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="First Name"
                    value={tempValue.firstName || ''}
                    onChange={(e) =>
                      setTempValue((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    sx={{ width: '140px' }}
                  />
                  <TextField
                    size="small"
                    placeholder="Last Name"
                    value={tempValue.lastName || ''}
                    onChange={(e) =>
                      setTempValue((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    sx={{ width: '140px' }}
                  />
                  {!isEditingAll && (
                    <>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={handleSave}
                      >
                        <SaveIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton size="small" onClick={handleCancel}>
                        <CloseIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </>
                  )}
                </Box>
              ) : (
                <Typography variant="h5" fontWeight={600}>
                  {fullName}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <EmailIcon sx={{ fontSize: 20 }} color="action" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block' }}
                  >
                    Email Address
                  </Typography>
                  {editingField !== 'email' && !isEditingAll ? (
                    <Typography variant="body2" fontWeight={500}>
                      {profile.email}
                    </Typography>
                  ) : editingField === 'email' || isEditingAll ? (
                    <TextField
                      fullWidth
                      size="small"
                      value={tempValue.email || ''}
                      onChange={(e) =>
                        setTempValue((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      sx={{ mt: 0.5 }}
                    />
                  ) : (
                    <Typography variant="body2" fontWeight={500}>
                      {profile.email}
                    </Typography>
                  )}
                </Box>
                {editingField !== 'email' && !isEditingAll ? (
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick('email')}
                  >
                    <EditIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                ) : editingField === 'email' ? (
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={handleSave}
                    >
                      <SaveIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton size="small" onClick={handleCancel}>
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                ) : null}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 20 }} color="action" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block' }}
                  >
                    Phone
                  </Typography>
                  {editingField !== 'phone' && !isEditingAll ? (
                    <Typography variant="body2" fontWeight={500}>
                      {profile.phone}
                    </Typography>
                  ) : editingField === 'phone' || isEditingAll ? (
                    <TextField
                      fullWidth
                      size="small"
                      value={tempValue.phone || ''}
                      onChange={(e) =>
                        setTempValue((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      sx={{ mt: 0.5 }}
                    />
                  ) : (
                    <Typography variant="body2" fontWeight={500}>
                      {profile.phone}
                    </Typography>
                  )}
                </Box>
                {editingField !== 'phone' && !isEditingAll ? (
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick('phone')}
                  >
                    <EditIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                ) : editingField === 'phone' ? (
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={handleSave}
                    >
                      <SaveIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton size="small" onClick={handleCancel}>
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                ) : null}
              </Box>
            </Box>

            {!isEditingAll ? (
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleEditClick('all')}
                sx={{ mt: 3 }}
              >
                Edit Profile
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
                <Button variant="outlined" fullWidth onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSave}
                  startIcon={<SaveIcon />}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
