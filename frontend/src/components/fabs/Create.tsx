// src/components/buttons/CreateFab.tsx
'use client';

import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';

interface CreateFabProps {
  onClick: () => void;
  ariaLabel?: string;
}

export function CreateFab({ onClick, ariaLabel = 'add' }: CreateFabProps) {
  return (
    <Fab
      color="primary"
      aria-label={ariaLabel}
      onClick={onClick}
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
      }}
    >
      <AddIcon />
    </Fab>
  );
}
