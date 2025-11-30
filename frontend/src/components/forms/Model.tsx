'use client';

import { useState } from 'react';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CampaignIcon from '@mui/icons-material/Campaign';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SchoolIcon from '@mui/icons-material/School';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TranslateIcon from '@mui/icons-material/Translate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';

import SalesModal from './types/Sales';
import SupportModal from './types/Support';

type AgentType =
  | 'support'
  | 'sales'
  | 'developer'
  | 'designer'
  | 'analyst'
  | 'translator'
  | 'tutor'
  | 'logistics'
  | 'finance'
  | 'marketing'
  | 'healthcare'
  | 'hospitality';

interface CreateAgentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (agentData: {
    name: string;
    type: AgentType;
    [key: string]: any;
  }) => void;
}

const agentTypes = [
  {
    type: 'support' as AgentType,
    label: 'Support',
    description: 'Customer support agent',
    icon: SupportAgentIcon,
  },
  {
    type: 'sales' as AgentType,
    label: 'Sales',
    description: 'Sales assistant agent',
    icon: TrendingUpIcon,
  },
  {
    type: 'developer' as AgentType,
    label: 'Developer',
    description: 'Code & technical assistant',
    icon: CodeIcon,
  },
  {
    type: 'designer' as AgentType,
    label: 'Designer',
    description: 'Design & creative helper',
    icon: DesignServicesIcon,
  },
  {
    type: 'analyst' as AgentType,
    label: 'Analyst',
    description: 'Data analysis specialist',
    icon: AnalyticsIcon,
  },
  {
    type: 'translator' as AgentType,
    label: 'Translator',
    description: 'Language translation',
    icon: TranslateIcon,
  },
  {
    type: 'tutor' as AgentType,
    label: 'Tutor',
    description: 'Educational assistant',
    icon: SchoolIcon,
  },
  {
    type: 'logistics' as AgentType,
    label: 'Logistics',
    description: 'Supply chain helper',
    icon: LocalShippingIcon,
  },
  {
    type: 'finance' as AgentType,
    label: 'Finance',
    description: 'Financial advisor',
    icon: AttachMoneyIcon,
  },
  {
    type: 'marketing' as AgentType,
    label: 'Marketing',
    description: 'Marketing campaigns',
    icon: CampaignIcon,
  },
  {
    type: 'healthcare' as AgentType,
    label: 'Healthcare',
    description: 'Medical assistant',
    icon: HealthAndSafetyIcon,
  },
  {
    type: 'hospitality' as AgentType,
    label: 'Hospitality',
    description: 'Restaurant & hotel',
    icon: RestaurantIcon,
  },
];

export default function CreateAgentModal({
  open,
  onClose,
  onSubmit,
}: CreateAgentModalProps) {
  const [selectedType, setSelectedType] = useState<AgentType | null>(null);
  const [showSpecificModal, setShowSpecificModal] = useState(false);

  const handleTypeSelect = (type: AgentType) => {
    setSelectedType(type);
    if (type === 'support' || type === 'sales') {
      setShowSpecificModal(true);
    }
  };

  const handleClose = () => {
    setSelectedType(null);
    setShowSpecificModal(false);
    onClose();
  };

  const handleSpecificModalClose = () => {
    setShowSpecificModal(false);
    setSelectedType(null);
  };

  const handleSpecificSubmit = (agentData: any) => {
    onSubmit(agentData);
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open && !showSpecificModal}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 4,
            pt: 3,
            pb: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Create New Agent
          </Typography>
          <IconButton onClick={handleClose} size="medium">
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ px: 4, pb: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontSize: '1rem' }}
            >
              Select Agent Type
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 2.5,
              }}
            >
              {agentTypes.map((agent) => {
                const IconComponent = agent.icon;
                return (
                  <Paper
                    key={agent.type}
                    onClick={() => handleTypeSelect(agent.type)}
                    elevation={1}
                    sx={{
                      p: 3,
                      cursor: 'pointer',
                      borderRadius: 2.5,
                      border: 2,
                      borderColor: 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-4px)',
                        elevation: 3,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2.5,
                          bgcolor: 'action.hover',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <IconComponent
                          sx={{
                            fontSize: 32,
                            color: 'text.secondary',
                          }}
                        />
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.95rem' }}
                        >
                          {agent.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontSize: '0.75rem' }}
                        >
                          {agent.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {selectedType === 'support' && (
        <SupportModal
          open={showSpecificModal}
          onClose={handleSpecificModalClose}
          onSubmit={handleSpecificSubmit}
        />
      )}

      {selectedType === 'sales' && (
        <SalesModal
          open={showSpecificModal}
          onClose={handleSpecificModalClose}
          onSubmit={handleSpecificSubmit}
        />
      )}
    </>
  );
}
