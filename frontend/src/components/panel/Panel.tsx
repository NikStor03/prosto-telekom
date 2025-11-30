'use client';

import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import CreateAgentModal from '../forms/Model';

interface Agent {
  id: string;
  name: string;
  type: 'support' | 'sales';
  lastActiveAt?: string;
  avatar?: string;
}

interface PanelProps {
  onAgentSelect: (agentId: string) => void;
  onExpandChange?: (expanded: boolean) => void;
  onAgentCreate?: (agentData: any) => void;
  agents: Agent[];
}

const collapsedWidth = 72;
const expandedWidth = 280;

export default function Panel({
  onAgentSelect,
  onExpandChange,
  onAgentCreate,
  agents,
}: PanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsExpanded(true);
    onExpandChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    onExpandChange?.(false);
  };

  const handleAgentClick = (agentId: string) => {
    setSelectedAgent(agentId);
    onAgentSelect(agentId);
  };

  const handleCreateAgent = (agentData: any) => {
    onAgentCreate?.(agentData);
    setIsModalOpen(false);
  };

  const filteredAgents = agents.filter((agent) => {
    const name = agent?.name ?? '';
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getLastUsedText = (lastActiveAt?: string) => {
    if (!lastActiveAt) return 'Never used';
    return lastActiveAt;
  };

  return (
    <>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          width: isExpanded ? expandedWidth : collapsedWidth,
          height: '100vh',
          bgcolor: 'primary.main',
          borderRight: 1,
          borderColor: 'primary.dark',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1200,
          transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            px: isExpanded ? 2 : 1.5,
            pt: 2.5,
            '&::-webkit-scrollbar': {
              width: 6,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 3,
            },
          }}
        >
          {filteredAgents.map((agent) => (
            <Tooltip
              key={agent.id}
              title={!isExpanded ? agent.name : ''}
              placement="right"
              arrow
            >
              <Box
                onClick={() => handleAgentClick(agent.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  height: 56,
                  px: isExpanded ? 0.75 : 0,
                  mb: 0.5,
                  borderRadius: 2,
                  cursor: 'pointer',
                  color: 'white',
                  backgroundColor:
                    selectedAgent === agent.id
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'transparent',
                  transition: 'all 0.2s ease',
                  justifyContent: isExpanded ? 'flex-start' : 'center',
                  '&:hover': {
                    backgroundColor:
                      selectedAgent === agent.id
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor:
                      selectedAgent === agent.id
                        ? 'primary.contrastText'
                        : 'rgba(255, 255, 255, 0.1)',
                    flexShrink: 0,
                  }}
                >
                  <SmartToyIcon
                    sx={{
                      fontSize: 20,
                      color:
                        selectedAgent === agent.id
                          ? 'primary.main'
                          : 'primary.contrastText',
                    }}
                  />
                </Avatar>

                {isExpanded && (
                  <Box
                    sx={{
                      flexGrow: 1,
                      minWidth: 0,
                      opacity: isExpanded ? 1 : 0,
                      transition: 'opacity 0.2s ease 0.1s',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.9375rem',
                        color: 'primary.contrastText',
                      }}
                    >
                      {agent.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.75rem',
                      }}
                    >
                      {getLastUsedText(agent.lastActiveAt)}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Tooltip>
          ))}

          <Tooltip
            title={!isExpanded ? 'Create Agent' : ''}
            placement="right"
            arrow
          >
            <Box
              onClick={() => setIsModalOpen(true)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 5.5,
                height: 56,
                px: isExpanded ? 0.75 : 0,
                mb: 0.5,
                borderRadius: 2,
                cursor: 'pointer',
                color: 'primary.main',
                bgcolor: 'primary.contrastText',
                justifyContent: isExpanded ? 'flex-start' : 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AddIcon sx={{ fontSize: 24 }} />
              </Box>
              {isExpanded && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    opacity: isExpanded ? 1 : 0,
                    transition: 'opacity 0.2s ease 0.1s',
                  }}
                >
                  Create Agent
                </Typography>
              )}
            </Box>
          </Tooltip>
        </Box>

        <Divider
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.2)',
            mx: 2,
            my: 1,
          }}
        />

        <Box sx={{ px: isExpanded ? 2 : 1, pb: 2 }}>
          {isExpanded ? (
            <TextField
              fullWidth
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 18 }}
                    />
                  </InputAdornment>
                ),
                sx: {
                  fontSize: '0.875rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  color: 'primary.contrastText',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    },
                  },
                  '& input': {
                    padding: '8px 12px',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.6)',
                      opacity: 1,
                    },
                  },
                },
              }}
            />
          ) : (
            <Tooltip title="Search" placement="right" arrow>
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <CreateAgentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAgent}
      />
    </>
  );
}
