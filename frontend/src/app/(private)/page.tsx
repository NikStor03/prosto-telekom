'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Routes } from '@constants/routes';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';

import { CompanyCard } from '@components/cards/Company';
import { CreateFab } from '@components/fabs/Create';
import { ProfileFab } from '@components/fabs/Profile';
import { CompanyFormData, CreateCompanyModal } from '@components/forms/Company';

interface Company extends CompanyFormData {
  id: string;
}

export default function HomePage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateCompany = (data: CompanyFormData) => {
    const newCompany: Company = {
      ...data,
      id: Date.now().toString(),
    };
    setCompanies((prev) => [...prev, newCompany]);
  };

  const handleCompanyClick = (companyId: string) => {
    router.push(`${Routes.Dashboard}/1`);
  };

  const handleProfileClick = () => {
    router.push(`${Routes.Profile}/1`);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: '#FFFFFF',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 1000,
              color: 'primary.main',
              letterSpacing: '-0.02em',
            }}
          >
            Sparrow
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          px: '5%',
          py: '5%',
        }}
      >
        {companies.length === 0 ? (
          <Box
            sx={{
              minHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#FFFFFF',
                textAlign: 'center',
                mb: 2,
              }}
            >
              Welcome! Create your first company
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleOpenModal}
              sx={{
                px: 6,
                py: 2,
              }}
            >
              Create Company
            </Button>
          </Box>
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                mb: 4,
              }}
            >
              Your Companies
            </Typography>

            <Grid container spacing={3}>
              {companies.map((company) => (
                <Grid item xs={12} sm={6} md={4} key={company.id}>
                  <CompanyCard
                    name={company.name}
                    email={company.email}
                    phone={company.phone}
                    location={company.location}
                    onClick={() => handleCompanyClick(company.id)}
                  />
                </Grid>
              ))}
            </Grid>

            <CreateFab onClick={handleOpenModal} />
            <ProfileFab onClick={handleProfileClick} hasOtherFabs={true} />
          </>
        )}

        {companies.length === 0 && (
          <ProfileFab onClick={handleProfileClick} hasOtherFabs={false} />
        )}

        <CreateCompanyModal
          open={modalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCreateCompany}
        />
      </Box>
    </Box>
  );
}
