'use client';

import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import CredentialsModal from '../Credentials';

type QuestionType =
  | 'short_text'
  | 'paragraph'
  | 'number'
  | 'single_choice'
  | 'multiple_choice';

interface SalesFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (config: any) => void;
}

interface ChoiceOption {
  id: string;
  label: string;
}

interface SalesQuestion {
  id: string;
  title: string;
  description: string;
  type: QuestionType;
  required: boolean;
  options: ChoiceOption[];
}

export default function SalesFormModal({
  open,
  onClose,
  onSubmit,
}: SalesFormModalProps) {
  const [formTitle, setFormTitle] = useState('Sales form');
  const [questions, setQuestions] = useState<SalesQuestion[]>([
    {
      id: '1',
      title: 'What is the customer interested in?',
      description: 'Product, plan or service the lead is asking about.',
      type: 'short_text',
      required: true,
      options: [],
    },
  ]);
  const [notes, setNotes] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const [agentData, setAgentData] = useState<any>(null);

  const resetState = () => {
    setFormTitle('Sales form');
    setQuestions([
      {
        id: '1',
        title: 'What is the customer interested in?',
        description: 'Product, plan or service the lead is asking about.',
        type: 'short_text',
        required: true,
        options: [],
      },
    ]);
    setNotes('');
    setAgentData(null);
    setShowCredentials(false);
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: 'New question',
        description: '',
        type: 'short_text',
        required: false,
        options: [],
      },
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) =>
      prev.length > 1 ? prev.filter((q) => q.id !== id) : prev
    );
  };

  const duplicateQuestion = (q: SalesQuestion) => {
    setQuestions((prev) => [
      ...prev,
      {
        ...q,
        id: Date.now().toString(),
        options: q.options.map((o) => ({
          ...o,
          id: `${o.id}-${Date.now()}`,
        })),
      },
    ]);
  };

  const updateQuestion = (id: string, patch: Partial<SalesQuestion>) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...patch } : q))
    );
  };

  const addOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [...q.options, { id: Date.now().toString(), label: '' }],
            }
          : q
      )
    );
  };

  const updateOption = (
    questionId: string,
    optionId: string,
    label: string
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, label } : o
              ),
            }
          : q
      )
    );
  };

  const removeOption = (questionId: string, optionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options:
                q.options.length > 1
                  ? q.options.filter((o) => o.id !== optionId)
                  : q.options,
            }
          : q
      )
    );
  };

  const handleSubmit = () => {
    const valid = questions.filter((q) => q.title.trim());
    if (!valid.length || !formTitle.trim()) return;

    const data = {
      type: 'sales',
      name: formTitle.trim(),
      title: formTitle.trim(),
      questions: valid,
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
    !formTitle.trim() || questions.every((q) => !q.title.trim());

  const renderQuestionExtra = (q: SalesQuestion) => {
    if (q.type === 'single_choice' || q.type === 'multiple_choice') {
      const options =
        q.options.length > 0
          ? q.options
          : [
              { id: `${q.id}-opt-1`, label: 'Option 1' },
              { id: `${q.id}-opt-2`, label: 'Option 2' },
            ];

      if (options !== q.options) {
        setQuestions((prev) =>
          prev.map((item) => (item.id === q.id ? { ...item, options } : item))
        );
      }

      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
            Options
          </Typography>

          {options.map((opt, idx) => (
            <Box
              key={opt.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <TextField
                placeholder={`Option ${idx + 1}`}
                value={opt.label}
                onChange={(e) => updateOption(q.id, opt.id, e.target.value)}
                fullWidth
                size="small"
              />
              {options.length > 1 && (
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => removeOption(q.id, opt.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              onClick={() => addOption(q.id)}
              size="small"
              sx={{ textTransform: 'none', fontSize: '0.85rem' }}
            >
              Add option
            </Button>
          </Box>
        </Box>
      );
    }

    if (q.type === 'number') {
      return (
        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
          This will be treated as a numeric field (e.g. budget, team size,
          number of seats).
        </Typography>
      );
    }

    return null;
  };

  return (
    <>
      <Dialog
        open={open && !showCredentials}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 2, maxHeight: '90vh' } }}
      >
        <Box
          sx={{
            px: 3,
            pt: 2.5,
            pb: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }} />
          <Box sx={{ textAlign: 'center', flex: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.35rem' }}>
              Sales form configuration
            </Typography>
            <Typography
              sx={{ color: 'text.secondary', mt: 0.5, fontSize: '1rem' }}
            >
              Build a flexible sales form: add questions, choose types, and let
              your sales bot handle the rest.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <DialogContent sx={{ px: 3, pt: 0, pb: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1.75,
              mb: 2,
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <TextField
              placeholder="Name form (e.g. Sales qualification form)"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              fullWidth
              size="small"
            />
          </Paper>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
            {questions.map((q, index) => (
              <Paper
                key={q.id}
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
                    Question #{index + 1}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={() => duplicateQuestion(q)}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                    {questions.length > 1 && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeQuestion(q.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}
                >
                  <TextField
                    placeholder="Question title (e.g. What is your budget?)"
                    value={q.title}
                    onChange={(e) =>
                      updateQuestion(q.id, { title: e.target.value })
                    }
                    fullWidth
                    size="small"
                  />

                  <TextField
                    placeholder="Optional description or hint for this question"
                    value={q.description}
                    onChange={(e) =>
                      updateQuestion(q.id, { description: e.target.value })
                    }
                    fullWidth
                    size="small"
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      sx={{ fontSize: '0.85rem', color: 'text.secondary' }}
                    >
                      Question type:
                    </Typography>
                    <Select
                      value={q.type}
                      onChange={(e) =>
                        updateQuestion(q.id, {
                          type: e.target.value as QuestionType,
                          options:
                            e.target.value === 'single_choice' ||
                            e.target.value === 'multiple_choice'
                              ? q.options
                              : [],
                        })
                      }
                      size="small"
                      sx={{ minWidth: 190 }}
                    >
                      <MenuItem value="short_text">Short answer</MenuItem>
                      <MenuItem value="paragraph">Paragraph</MenuItem>
                      <MenuItem value="number">Number</MenuItem>
                      <MenuItem value="single_choice">Single choice</MenuItem>
                      <MenuItem value="multiple_choice">
                        Multiple choice
                      </MenuItem>
                    </Select>
                  </Box>

                  {renderQuestionExtra(q)}
                </Box>
              </Paper>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addQuestion}
                sx={{
                  borderRadius: 999,
                  px: 3,
                  py: 0.8,
                }}
              >
                Add question
              </Button>
            </Box>

            <Box sx={{ mt: 2.2, mb: 1 }}>
              <Divider />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>
                Sales notes for AI
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                Explain how the bot should use answers (qualification, next
                steps, when to escalate to human sales, upsell rules, etc.).
                This text is only for AI.
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
                  placeholder="For example: Use budget + company size to choose plan, if interest is Enterprise route to human sales, if there are objections ask 1–2 follow‑up questions before closing..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={6}
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
          agentType="sales"
          agentName={agentData.name}
        />
      )}
    </>
  );
}
