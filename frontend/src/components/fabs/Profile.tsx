'use client';

import PersonIcon from '@mui/icons-material/Person';
import { Fab } from '@mui/material';

interface ProfileFabProps {
  onClick: () => void;
  hasOtherFabs?: boolean;
}

export function ProfileFab({ onClick, hasOtherFabs = false }: ProfileFabProps) {
  return (
    <Fab
      aria-label="profile"
      onClick={onClick}
      sx={{
        position: 'fixed',
        bottom: hasOtherFabs ? 96 : 32,
        right: 32,
        backgroundColor: '#FFFFFF',
        color: '#611f69',
        '&:hover': {
          backgroundColor: '#F8F8F8',
        },
      }}
    >
      <PersonIcon />
    </Fab>
  );
}
