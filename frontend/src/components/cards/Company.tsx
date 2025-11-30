'use client';

import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

interface CompanyCardProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  onClick?: () => void;
}

export function CompanyCard({
  name,
  email,
  phone,
  location,
  onClick,
}: CompanyCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        width: 500,
        height: '100%',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              backgroundColor: '#611f69',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <BusinessIcon sx={{ color: '#FFFFFF', fontSize: 32 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1D1C1D' }}>
            {name}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2.5 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <LocationOnIcon
              sx={{
                fontSize: 20,
                color: '#611f69',
                mr: 1.5,
                mt: 0.25,
              }}
            />
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#616061',
                  fontWeight: 600,
                  display: 'block',
                  mb: 0.25,
                }}
              >
                Location
              </Typography>
              <Typography variant="body2" color="text.primary">
                {location}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <EmailIcon
              sx={{
                fontSize: 20,
                color: '#611f69',
                mr: 1.5,
                mt: 0.25,
              }}
            />
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#616061',
                  fontWeight: 600,
                  display: 'block',
                  mb: 0.25,
                }}
              >
                Email
              </Typography>
              <Typography variant="body2" color="text.primary">
                {email}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <PhoneIcon
              sx={{
                fontSize: 20,
                color: '#611f69',
                mr: 1.5,
                mt: 0.25,
              }}
            />
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#616061',
                  fontWeight: 600,
                  display: 'block',
                  mb: 0.25,
                }}
              >
                Phone
              </Typography>
              <Typography variant="body2" color="text.primary">
                {phone}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
