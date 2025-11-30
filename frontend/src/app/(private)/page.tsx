'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Routes } from '@constants/routes';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

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

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleCreateCompany = (data: CompanyFormData) => {
    const newCompany: Company = { ...data, id: Date.now().toString() };
    setCompanies((prev) => [...prev, newCompany]);
  };

  const handleCompanyClick = (companyId: string) => {
    router.push(`${Routes.Dashboard}/1`);
  };

  const handleProfileClick = () => {
    router.push(`${Routes.Profile}/1`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
      }}
    >
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

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {companies.length === 0 ? (
          <Box
            sx={{
              minHeight: '82vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Welcome! Create your first company
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 480 }}
            >
              Create a company to start connecting Sparrow agents to your
              business.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleOpenModal}
              sx={{
                px: 6,
                py: 2,
                borderRadius: 999,
              }}
            >
              Create company
            </Button>
          </Box>
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 4,
                color: 'text.primary',
              }}
            >
              Your companies
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
      </Container>
    </Box>
  );
}
