'use client';

import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import CredentialsModal from '../Credentials';

interface SupportModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (agentData: any) => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function SupportModal({
  open,
  onClose,
  onSubmit,
}: SupportModalProps) {
  const [formTitle, setFormTitle] = useState('Support FAQ form');
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    { id: '1', question: '', answer: '' },
  ]);
  const [notes, setNotes] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const [agentData, setAgentData] = useState<any>(null);

  const handleAddFAQ = () => {
    setFaqItems((prev) => [
      ...prev,
      { id: Date.now().toString(), question: '', answer: '' },
    ]);
  };

  const handleRemoveFAQ = (id: string) => {
    setFaqItems((prev) =>
      prev.length > 1 ? prev.filter((item) => item.id !== id) : prev
    );
  };

  const handleQuestionChange = (id: string, value: string) => {
    setFaqItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, question: value } : item))
    );
  };

  const handleAnswerChange = (id: string, value: string) => {
    setFaqItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, answer: value } : item))
    );
  };

  const resetState = () => {
    setFormTitle('Support FAQ form');
    setFaqItems([{ id: '1', question: '', answer: '' }]);
    setNotes('');
    setAgentData(null);
    setShowCredentials(false);
  };

  const handleSubmit = () => {
    const validFAQs = faqItems.filter(
      (item) => item.question.trim() && item.answer.trim()
    );
    if (!formTitle.trim() || validFAQs.length === 0) return;

    const data = {
      type: 'support',
      name: formTitle.trim(),
      title: formTitle.trim(),
      faqs: validFAQs,
      notes: notes.trim() || null,
    };

    setAgentData(data);
    setShowCredentials(true);
  };

  const handleCredentialsSubmit = (credentials: any) => {
    const finalData = {
      ...agentData,
      credentials,
    };
    onSubmit(finalData);
    resetState();
    onClose();
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const isSubmitDisabled =
    !formTitle.trim() ||
    faqItems.every((item) => !item.question.trim() || !item.answer.trim());

  return (
    <>
      <Dialog
        open={open && !showCredentials}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{
          sx: { borderRadius: 2, maxHeight: '90vh' },
        }}
      >
        <Box
          sx={{
            px: 3,
            pt: 2.5,
            pb: 1.5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }} />
          <Box sx={{ textAlign: 'center', flex: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.35rem' }}>
              Support FAQ configuration
            </Typography>
            <Typography
              sx={{ color: 'text.secondary', mt: 0.5, fontSize: '1rem' }}
            >
              Configure questions and answers that your support bot will use.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <DialogContent sx={{ px: 3, pb: 2, pt: 0.5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              mb: 2,
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <TextField
              placeholder="Name form (e.g. Support FAQ for online store)"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              fullWidth
              size="small"
            />
          </Paper>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
            {faqItems.map((item, index) => (
              <Paper
                key={item.id}
                elevation={0}
                sx={{
                  p: 1.75,
                  borderRadius: 1.5,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                    }}
                  >
                    FAQ #{index + 1}
                  </Typography>
                  {faqItems.length > 1 && (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveFAQ(item.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}
                >
                  <TextField
                    placeholder="Question"
                    value={item.question}
                    onChange={(e) =>
                      handleQuestionChange(item.id, e.target.value)
                    }
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={2}
                    size="small"
                  />

                  <TextField
                    placeholder="Answer"
                    value={item.answer}
                    onChange={(e) =>
                      handleAnswerChange(item.id, e.target.value)
                    }
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={3}
                    size="small"
                  />
                </Box>
              </Paper>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddFAQ}
                sx={{
                  borderRadius: 999,
                  px: 3,
                  py: 0.8,
                }}
              >
                Add FAQ block
              </Button>
            </Box>

            <Box sx={{ mt: 2.2, mb: 1 }}>
              <Divider />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>
                Notes for AI
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                Describe how the bot should behave (tone, priorities, edge
                cases). This text is only for AI and is not shown to customers.
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  borderRadius: 1.5,
                  border: '1px dashed',
                  borderColor: 'divider',
                }}
              >
                <TextField
                  aria-placeholder="Notes / Prompt for AI"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={6}
                  placeholder="For example: Respond politely and briefly, always clarify the order number first..."
                  size="small"
                />
              </Paper>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, pt: 1.5 }}>
          <Button
            onClick={handleClose}
            variant="text"
            sx={{ textTransform: 'none', fontSize: '1rem' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isSubmitDisabled}
            sx={{ px: 3, textTransform: 'none', fontSize: '1rem' }}
          >
            Next: Setup Connection
          </Button>
        </DialogActions>
      </Dialog>

      {agentData && (
        <CredentialsModal
          open={showCredentials}
          onClose={() => setShowCredentials(false)}
          onSubmit={handleCredentialsSubmit}
          agentType="support"
          agentName={agentData.name}
        />
      )}
    </>
  );
}
