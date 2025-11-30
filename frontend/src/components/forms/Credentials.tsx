import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

interface CredentialsModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (credentials: any) => void;
  agentType: 'support' | 'sales';
  agentName: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`credentials-tabpanel-${index}`}
      aria-labelledby={`credentials-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CredentialsModal({
  open,
  onClose,
  onSubmit,
  agentType,
  agentName,
}: CredentialsModalProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [whatsappToken, setWhatsappToken] = useState('');
  const [whatsappRefreshToken, setWhatsappRefreshToken] = useState('');
  const [whatsappPhoneId, setWhatsappPhoneId] = useState('');

  const [instagramToken, setInstagramToken] = useState('');
  const [instagramAccountId, setInstagramAccountId] = useState('');
  const [instagramPageId, setInstagramPageId] = useState('');

  const generateChatBotScript = () => {
    const botId = `bot_${Date.now()}`;
    return `<!-- ${agentName} Chat Widget -->
<script>
  (function() {
    window.chatBotConfig = {
      botId: '${botId}',
      agentType: '${agentType}',
      agentName: '${agentName}',
      primaryColor: '#1B365D',
      position: 'bottom-right'
    };
    var script = document.createElement('script');
    script.src = 'https://cdn.yourcompany.com/chatbot-widget.js';
    script.async = true;
    document.body.appendChild(script);
  })();
</script>`;
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleCopyScript = () => {
    const script = generateChatBotScript();
    navigator.clipboard.writeText(script);
    setSnackbarMessage('Script copied to clipboard!');
    setShowSnackbar(true);
  };

  const handleSaveWhatsApp = () => {
    if (!whatsappToken || !whatsappRefreshToken || !whatsappPhoneId) {
      setSnackbarMessage('Please fill all WhatsApp fields');
      setShowSnackbar(true);
      return;
    }

    const credentials = {
      platform: 'whatsapp',
      token: whatsappToken,
      refreshToken: whatsappRefreshToken,
      phoneId: whatsappPhoneId,
    };

    onSubmit(credentials);
    setSnackbarMessage('WhatsApp credentials saved successfully!');
    setShowSnackbar(true);
  };

  const handleSaveInstagram = () => {
    if (!instagramToken || !instagramAccountId || !instagramPageId) {
      setSnackbarMessage('Please fill all Instagram fields');
      setShowSnackbar(true);
      return;
    }

    const credentials = {
      platform: 'instagram',
      token: instagramToken,
      accountId: instagramAccountId,
      pageId: instagramPageId,
    };

    onSubmit(credentials);
    setSnackbarMessage('Instagram credentials saved successfully!');
    setShowSnackbar(true);
  };

  const handleClose = () => {
    setWhatsappToken('');
    setWhatsappRefreshToken('');
    setWhatsappPhoneId('');
    setInstagramToken('');
    setInstagramAccountId('');
    setInstagramPageId('');
    setCurrentTab(0);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, minHeight: 500 },
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
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Setup Credentials
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Configure connection for: {agentName}
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="medium">
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ px: 4, pb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab
                icon={<WhatsAppIcon />}
                iconPosition="start"
                label="WhatsApp"
              />
              <Tab
                icon={<InstagramIcon />}
                iconPosition="start"
                label="Instagram"
              />
              <Tab icon={<CodeIcon />} iconPosition="start" label="Chat Bot" />
            </Tabs>
          </Box>

          <TabPanel value={currentTab} index={0}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Alert severity="info">
                You can get these credentials from your WhatsApp Business API
                dashboard
              </Alert>

              <TextField
                label="WhatsApp Access Token"
                fullWidth
                value={whatsappToken}
                onChange={(e) => setWhatsappToken(e.target.value)}
                placeholder="EAAxxxxxxxxxxxxx"
                helperText="Your WhatsApp Business API access token"
              />

              <TextField
                label="Refresh Token"
                fullWidth
                value={whatsappRefreshToken}
                onChange={(e) => setWhatsappRefreshToken(e.target.value)}
                placeholder="EAAxxxxxxxxxxxxx"
                helperText="Token used to refresh the access token"
              />

              <TextField
                label="Phone Number ID"
                fullWidth
                value={whatsappPhoneId}
                onChange={(e) => setWhatsappPhoneId(e.target.value)}
                placeholder="123456789012345"
                helperText="Your WhatsApp Business phone number ID"
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSaveWhatsApp}
                  sx={{ minWidth: 120 }}
                >
                  Save Setup
                </Button>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Alert severity="info">
                Connect your Instagram Business account through Facebook Graph
                API
              </Alert>

              <TextField
                label="Instagram Access Token"
                fullWidth
                value={instagramToken}
                onChange={(e) => setInstagramToken(e.target.value)}
                placeholder="IGQVJxxxxxxxxxxxxx"
                helperText="Your Instagram Graph API access token"
              />

              <TextField
                label="Instagram Account ID"
                fullWidth
                value={instagramAccountId}
                onChange={(e) => setInstagramAccountId(e.target.value)}
                placeholder="17841405309211844"
                helperText="Your Instagram Business account ID"
              />

              <TextField
                label="Facebook Page ID"
                fullWidth
                value={instagramPageId}
                onChange={(e) => setInstagramPageId(e.target.value)}
                placeholder="108424175278590"
                helperText="Facebook Page connected to your Instagram account"
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSaveInstagram}
                  sx={{ minWidth: 120 }}
                >
                  Save Setup
                </Button>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={currentTab} index={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Alert severity="success">
                Copy the script below and paste it before the closing{' '}
                <code>&lt;/body&gt;</code> tag on your website
              </Alert>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  bgcolor: '#F5F5F5',
                  borderRadius: 2,
                  position: 'relative',
                }}
              >
                <IconButton
                  onClick={handleCopyScript}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                  }}
                  size="small"
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>

                <Typography
                  component="pre"
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    m: 0,
                    pr: 5,
                  }}
                >
                  {generateChatBotScript()}
                </Typography>
              </Paper>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  What happens next?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1. Copy the script above
                  <br />
                  2. Paste it into your website before the closing{' '}
                  <code>&lt;/body&gt;</code> tag
                  <br />
                  3. The chat widget will appear on your website
                  <br />
                  4. Visitors can start chatting with your {agentType} bot
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCopyScript}
                  startIcon={<ContentCopyIcon />}
                >
                  Copy Script
                </Button>
              </Box>
            </Box>
          </TabPanel>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}
