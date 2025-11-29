'use client';

import { use, useState } from 'react';

import { useRouter } from 'next/navigation';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import Panel from '@components/panel/Panel';

const iconBarWidth = 72;
const expandedWidth = 320;

interface DashboardPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId);
    console.log('Selected agent:', agentId);
  };

  const handlePanelExpandChange = (expanded: boolean) => {
    setIsPanelExpanded(expanded);
  };

  const handleProfileClick = () => {
    router.push('/profile/1');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Panel
        onAgentSelect={handleAgentSelect}
        onExpandChange={handlePanelExpandChange}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: 'background.default',
          marginLeft: isPanelExpanded
            ? `${expandedWidth}px`
            : `${iconBarWidth}px`,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: 'transparent',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="h1" sx={{ color: '#FFFFFF' }}>
              Dashboard - ID: {id}
            </Typography>

            <Tooltip title="Profile">
              <IconButton
                onClick={handleProfileClick}
                sx={{
                  color: '#E0E0E0',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ color: '#FFFFFF', mb: 3 }}>
            Welcome to Agent Dashboard
          </Typography>

          {selectedAgent ? (
            <Box
              sx={{
                backgroundColor: 'action.hover',
                borderRadius: 2,
                p: 4,
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
                Agent ID: {selectedAgent}
              </Typography>
              <Typography variant="body1" sx={{ color: '#E0E0E0' }}>
                This is where agent interaction will happen.
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ color: '#E0E0E0' }}>
              Select an agent from the sidebar to start.
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
}
