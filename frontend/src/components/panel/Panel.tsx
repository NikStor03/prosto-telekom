'use client';

import { useCallback, useRef, useState } from 'react';

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

interface Agent {
  id: string;
  name: string;
  lastUsed: string;
  avatar?: string;
}

interface PanelProps {
  onAgentSelect: (agentId: string) => void;
  onExpandChange: (expanded: boolean) => void;
}

const iconBarWidth = 72;
const expandedWidth = 320;

export default function Panel({ onAgentSelect, onExpandChange }: PanelProps) {
  const [agents, setAgents] = useState<Agent[]>([
    { id: '1', name: 'GPT-4 Assistant', lastUsed: '2 mins ago' },
    { id: '2', name: 'Code Helper', lastUsed: '1 hour ago' },
    { id: '3', name: 'Data Analyst', lastUsed: 'Yesterday' },
    { id: '4', name: 'Designer Bot', lastUsed: '3 days ago' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCreateAgent = useCallback(() => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: `New Agent ${agents.length + 1}`,
      lastUsed: 'Just now',
    };
    setAgents([newAgent, ...agents]);
  }, [agents]);

  const handleMouseEnter = useCallback(() => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsExpanded(true);
    onExpandChange(true);
  }, [onExpandChange]);

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Проверяем действительно ли курсор покинул панель
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const { clientX, clientY } = e;
      const isOutside =
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom;

      if (isOutside) {
        if (leaveTimeoutRef.current) {
          clearTimeout(leaveTimeoutRef.current);
        }
        leaveTimeoutRef.current = setTimeout(() => {
          setIsExpanded(false);
          onExpandChange(false);
        }, 50);
      }
    },
    [onExpandChange]
  );

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: isExpanded ? expandedWidth : iconBarWidth,
        background:
          'linear-gradient(180deg, rgba(26, 15, 30, 0.95) 0%, rgba(15, 7, 18, 0.98) 100%)',
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 1200,
        transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Icon Bar - Always Visible */}
      <Box
        sx={{
          width: iconBarWidth,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          flexShrink: 0,
        }}
      >
        {/* New Agent Icon */}
        <Tooltip
          title="New Agent"
          placement="right"
          disableHoverListener={isExpanded}
        >
          <IconButton
            onClick={handleCreateAgent}
            sx={{
              width: 48,
              height: 48,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              mb: 2,
              '&:hover': {
                backgroundColor: 'primary.dark',
                borderRadius: 2,
              },
              transition: 'all 0.2s ease',
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>

        <Divider
          sx={{
            width: 40,
            mb: 2,
          }}
        />

        {/* Agent Icons */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            width: '100%',
            '&::-webkit-scrollbar': {
              width: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'action.hover',
              borderRadius: 2,
            },
          }}
        >
          {filteredAgents.map((agent) => (
            <Tooltip
              key={agent.id}
              title={agent.name}
              placement="right"
              disableHoverListener={isExpanded}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 1.5,
                }}
              >
                <Avatar
                  onClick={() => onAgentSelect(agent.id)}
                  sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: 'secondary.main',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderRadius: 2,
                      backgroundColor: 'primary.main',
                    },
                  }}
                >
                  <SmartToyIcon />
                </Avatar>
              </Box>
            </Tooltip>
          ))}
        </Box>

        {/* Search Icon at Bottom */}
        <Tooltip
          title="Search"
          placement="right"
          disableHoverListener={isExpanded}
        >
          <IconButton
            sx={{
              width: 48,
              height: 48,
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'action.hover',
                borderRadius: 2,
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Expanded Text Content */}
      <Box
        sx={{
          width: expandedWidth - iconBarWidth,
          display: isExpanded ? 'flex' : 'none',
          flexDirection: 'column',
          opacity: isExpanded ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, pr: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              mb: 2,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            AI Agents
          </Typography>
          <Box
            onClick={handleCreateAgent}
            sx={{
              width: '100%',
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 1,
              py: 1.2,
              px: 2,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <AddIcon sx={{ fontSize: 18 }} />
            <Typography
              variant="button"
              sx={{ fontWeight: 600, fontSize: '0.875rem' }}
            >
              New Agent
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Agents List */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            px: 2,
            py: 1,
            '&::-webkit-scrollbar': {
              width: 6,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'action.hover',
              borderRadius: 3,
              '&:hover': {
                backgroundColor: 'action.selected',
              },
            },
          }}
        >
          {filteredAgents.map((agent) => (
            <Box
              key={agent.id}
              onClick={() => onAgentSelect(agent.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1,
                mb: 0.5,
                borderRadius: 1,
                cursor: 'pointer',
                color: 'text.secondary',
                transition: 'all 0.15s ease',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'text.primary',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: 'secondary.main',
                  flexShrink: 0,
                }}
              >
                <SmartToyIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '0.9375rem',
                  }}
                >
                  {agent.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.disabled',
                    fontSize: '0.75rem',
                  }}
                >
                  {agent.lastUsed}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Search at Bottom */}
        <Box
          sx={{
            p: 2,
            pt: 1,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <TextField
            fullWidth
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
                </InputAdornment>
              ),
              sx: {
                fontSize: '0.875rem',
                '& input': {
                  padding: '8px 12px',
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
