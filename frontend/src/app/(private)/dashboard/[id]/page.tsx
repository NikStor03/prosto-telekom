'use client';

import { use, useState } from 'react';

import { useRouter } from 'next/navigation';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import CreateAgentModal from '@components/forms/Model';
import Panel from '@components/panel/Panel';

const iconBarWidth = 72;
const expandedWidth = 320;

interface DashboardPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface ChatMessage {
  sender: 'User' | 'Bot';
  text: string;
  time: string;
}

interface SupportTicket {
  id: string;
  question: string;
  user: string;
  date: string;
  chat: ChatMessage[];
}

interface SalesTicket {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  productName: string;
  productSku: string;
  quantity: number;
  pricePerUnit: number;
  currency: string;
  shippingAddress: string;
  city: string;
  country: string;
  status: 'New' | 'In progress' | 'Waiting payment';
  createdAt: string;
  note: string;
}

interface AgentCredentials {
  platform: 'whatsapp' | 'instagram' | 'chatbot';
  token?: string;
  refreshToken?: string;
  phoneId?: string;
  accountId?: string;
  pageId?: string;
  botId?: string;
}

interface Agent {
  id: string;
  name: string;
  type: 'support' | 'sales';
  description: string;
  createdAt: string;
  lastActiveAt: string;
  credentials?: AgentCredentials;
  totalConversations?: number;
  uniqueUsers?: number;
  satisfactionScore?: number;
  resolutionRate?: number;
  avgResponseTimeSec?: number;
  topFaqs?: { question: string; hits: number }[];
  openTickets?: SupportTicket[];
  totalLeads?: number;
  qualifiedLeads?: number;
  closedDeals?: number;
  revenue?: number;
  conversionRate?: number;
  topIntents?: { label: string; count: number }[];
  salesTickets?: SalesTicket[];
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '59e86f71-dca2-457a-aff7-9caa12f5df4c',
      name: 'Store support bot',
      type: 'support',
      description: 'Handles customer inquiries',
      createdAt: '2025-10-01',
      lastActiveAt: '2025-11-30 03:45',
      totalConversations: 842,
      uniqueUsers: 356,
      satisfactionScore: 92,
      resolutionRate: 88,
      avgResponseTimeSec: 1.7,
      topFaqs: [
        { question: 'Where is my order?', hits: 210 },
        { question: 'How can I return an item?', hits: 165 },
        { question: 'Do you ship internationally?', hits: 98 },
      ],
      openTickets: [
        {
          id: 't1',
          question: "I can't cancel my order",
          user: 'Ivan Ivanov',
          date: '2025-11-29 21:40',
          chat: [
            {
              sender: 'User',
              text: 'I want to cancel my order',
              time: '21:40',
            },
            {
              sender: 'Bot',
              text: 'Please provide your order number.',
              time: '21:41',
            },
            { sender: 'User', text: 'Order 987654', time: '21:41' },
            {
              sender: 'Bot',
              text: 'Automated cancel is not available for this order. Transferring to human support.',
              time: '21:42',
            },
          ],
        },
      ],
    },
    {
      id: '4180be14-49e5-4528-b03d-7d431ff39951',
      name: 'B2B sales assistant',
      type: 'sales',
      description: 'Manages sales pipeline',
      createdAt: '2025-09-12',
      lastActiveAt: '2025-11-29 22:10',
      totalLeads: 430,
      qualifiedLeads: 180,
      closedDeals: 56,
      revenue: 48200,
      conversionRate: 13,
      topIntents: [
        { label: 'Pricing & plans', count: 150 },
        { label: 'Enterprise deals', count: 80 },
        { label: 'Discounts & promos', count: 65 },
      ],
      salesTickets: [
        {
          id: 's1',
          customerName: 'ACME Corp',
          email: 'buyer@acme.com',
          phone: '+1 202 555 0110',
          productName: 'Pro subscription – annual',
          productSku: 'PRO-ANNUAL',
          quantity: 25,
          pricePerUnit: 49,
          currency: '€',
          shippingAddress: '221B Baker Street, Suite 4',
          city: 'London',
          country: 'United Kingdom',
          status: 'In progress',
          createdAt: '2025-11-29 18:20',
          note: 'Asked for 10% volume discount. Waiting for approval from sales manager.',
        },
      ],
    },
  ]);

  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [selectedSupportTicket, setSelectedSupportTicket] =
    useState<SupportTicket | null>(null);
  const [selectedSalesTicket, setSelectedSalesTicket] =
    useState<SalesTicket | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId);
  };

  const handlePanelExpandChange = (expanded: boolean) => {
    setIsPanelExpanded(expanded);
  };

  const handleProfileClick = () => {
    router.push('/profile/1');
  };

  const handleCreateAgent = (agentData: any) => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: agentData.name,
      type: agentData.type,
      description: agentData.description || '',
      createdAt: new Date().toISOString().split('T')[0],
      lastActiveAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      credentials: agentData.credentials,
      ...(agentData.type === 'support'
        ? {
            totalConversations: 0,
            uniqueUsers: 0,
            satisfactionScore: 0,
            resolutionRate: 0,
            avgResponseTimeSec: 0,
            topFaqs: [],
            openTickets: [],
          }
        : {
            totalLeads: 0,
            qualifiedLeads: 0,
            closedDeals: 0,
            revenue: 0,
            conversionRate: 0,
            topIntents: [],
            salesTickets: [],
          }),
    };

    setAgents((prev) => [...prev, newAgent]);
  };

  const currentAgent = agents.find((a) => a.id === selectedAgent);

  const renderSupportLayout = (bot: Agent) => {
    return (
      <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
        {bot.credentials && (
          <Paper sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: '#E8F5E9' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              ✓ Connected to {bot.credentials.platform}
            </Typography>
            {bot.credentials.platform === 'whatsapp' && (
              <Typography variant="body2" color="text.secondary">
                Phone ID: {bot.credentials.phoneId}
              </Typography>
            )}
            {bot.credentials.platform === 'instagram' && (
              <Typography variant="body2" color="text.secondary">
                Account ID: {bot.credentials.accountId}
              </Typography>
            )}
          </Paper>
        )}

        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={3}
          sx={{ mb: 3, alignItems: 'stretch' }}
        >
          <Stack spacing={3} sx={{ flex: 1 }}>
            <Paper
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 2,
                minHeight: 200,
                background: '#3A6FB8',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ opacity: 0.9, mb: 2, color: '#FFFFFF', fontSize: '1rem' }}
              >
                Conversations & users
              </Typography>
              <Typography
                sx={{ fontSize: '3rem', fontWeight: 700, color: '#FFFFFF' }}
              >
                {bot.totalConversations || 0}
              </Typography>
              <Typography
                sx={{ opacity: 0.9, color: '#FFFFFF', fontSize: '1rem' }}
              >
                total conversations · {bot.uniqueUsers || 0} unique users
              </Typography>
            </Paper>

            <Paper
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 2,
                minHeight: 280,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Open support tickets
              </Typography>
              {!bot.openTickets || bot.openTickets.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  All tickets are closed. 🎉
                </Typography>
              ) : (
                <Stack spacing={1.5}>
                  {bot.openTickets.map((ticket) => (
                    <Button
                      key={ticket.id}
                      variant="outlined"
                      fullWidth
                      onClick={() => setSelectedSupportTicket(ticket)}
                      sx={{
                        justifyContent: 'flex-start',
                        borderRadius: 2,
                        textTransform: 'none',
                        p: 2,
                      }}
                    >
                      <Chip
                        label="Open"
                        color="warning"
                        size="small"
                        sx={{ mr: 1.5 }}
                      />
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                          {ticket.question}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {ticket.user} · {ticket.date}
                        </Typography>
                      </Box>
                    </Button>
                  ))}
                </Stack>
              )}
            </Paper>
          </Stack>

          <Stack spacing={3} sx={{ flex: 1 }}>
            <Paper
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 2,
                minHeight: 200,
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                mb={2}
                fontSize="1rem"
              >
                Satisfaction
              </Typography>
              <Typography
                sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#2E7D32' }}
              >
                {bot.satisfactionScore || 0}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={bot.satisfactionScore || 0}
                color="success"
                sx={{
                  mt: 2,
                  height: 10,
                  borderRadius: 999,
                }}
              />
            </Paper>

            <Paper
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 2,
                minHeight: 280,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Top customer questions
              </Typography>
              {!bot.topFaqs || bot.topFaqs.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No FAQ data yet.
                </Typography>
              ) : (
                <Stack spacing={1.5}>
                  {bot.topFaqs.map((faq, index) => (
                    <Box
                      key={faq.question + index}
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                        {faq.question}
                      </Typography>
                      <Chip
                        label={`${faq.hits} hits`}
                        size="medium"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  ))}
                </Stack>
              )}
            </Paper>
          </Stack>
        </Stack>
      </Box>
    );
  };

  const renderSalesLayout = (bot: Agent) => {
    return (
      <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
        {bot.credentials && (
          <Paper sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: '#E8F5E9' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              ✓ Connected to {bot.credentials.platform}
            </Typography>
            {bot.credentials.platform === 'whatsapp' && (
              <Typography variant="body2" color="text.secondary">
                Phone ID: {bot.credentials.phoneId}
              </Typography>
            )}
            {bot.credentials.platform === 'instagram' && (
              <Typography variant="body2" color="text.secondary">
                Account ID: {bot.credentials.accountId}
              </Typography>
            )}
          </Paper>
        )}

        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={3}
          sx={{ mb: 3, alignItems: 'stretch' }}
        >
          <Stack spacing={3} sx={{ flex: 1 }}>
            <Paper
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 2,
                minHeight: 200,
                background: '#3A6FB8',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ opacity: 0.9, mb: 2, color: '#FFFFFF', fontSize: '1rem' }}
              >
                Leads & pipeline
              </Typography>
              <Typography
                sx={{ fontSize: '3rem', fontWeight: 700, color: '#FFFFFF' }}
              >
                {bot.totalLeads || 0}
              </Typography>
              <Typography
                sx={{ opacity: 0.9, color: '#FFFFFF', fontSize: '1rem' }}
              >
                leads · {bot.qualifiedLeads || 0} qualified
              </Typography>
            </Paper>

            <Paper
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 2,
                minHeight: 280,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Sales tickets
              </Typography>
              {!bot.salesTickets || bot.salesTickets.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No open sales tickets.
                </Typography>
              ) : (
                <Stack spacing={1.5}>
                  {bot.salesTickets.map((ticket) => (
                    <Button
                      key={ticket.id}
                      variant="outlined"
                      fullWidth
                      onClick={() => setSelectedSalesTicket(ticket)}
                      sx={{
                        justifyContent: 'flex-start',
                        borderRadius: 2,
                        textTransform: 'none',
                        p: 2,
                      }}
                    >
                      <Chip
                        label={ticket.status}
                        color="warning"
                        size="small"
                        sx={{ mr: 1.5 }}
                      />
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                          {ticket.customerName} · {ticket.productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {ticket.city}, {ticket.country}
                        </Typography>
                      </Box>
                    </Button>
                  ))}
                </Stack>
              )}
            </Paper>
          </Stack>

          <Stack spacing={3} sx={{ flex: 1 }}>
            <Paper
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 2,
                minHeight: 200,
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                mb={2}
                fontSize="1rem"
              >
                Deals & revenue
              </Typography>
              <Typography sx={{ fontSize: '1.8rem', fontWeight: 700 }}>
                <Box component="span" sx={{ color: '#2E7D32' }}>
                  {bot.closedDeals || 0} closed
                </Box>{' '}
                ·{' '}
                <Box component="span" sx={{ color: '#2E7D32' }}>
                  €{(bot.revenue || 0).toLocaleString()}
                </Box>
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 1.5 }}
              >
                Conversion rate:{' '}
                <Box
                  component="span"
                  sx={{ fontWeight: 700, color: '#2E7D32' }}
                >
                  {bot.conversionRate || 0}%
                </Box>
                .
              </Typography>
            </Paper>

            <Paper
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 2,
                minHeight: 280,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Popular sales intents
              </Typography>
              {!bot.topIntents || bot.topIntents.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No intent data yet.
                </Typography>
              ) : (
                <Stack spacing={1.5}>
                  {bot.topIntents.map((intent, index) => (
                    <Box
                      key={intent.label + index}
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                        {intent.label}
                      </Typography>
                      <Chip
                        label={`${intent.count} conversations`}
                        size="medium"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  ))}
                </Stack>
              )}
            </Paper>
          </Stack>
        </Stack>
      </Box>
    );
  };

  const renderAgentInfo = () => {
    if (!currentAgent) {
      return (
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(90vh - 80px)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: 700, fontSize: 56 }}
            color="text.primary"
          >
            Welcome to Agent Dashboard
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 5, fontSize: 20 }}
          >
            Create your first Sparrow agent to start tracking conversations and
            sales.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 7,
              py: 2,
              borderRadius: 999,
              fontSize: '1.05rem',
            }}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create your first bot
          </Button>
        </Box>
      );
    }

    if (currentAgent.type === 'support')
      return renderSupportLayout(currentAgent);
    if (currentAgent.type === 'sales') return renderSalesLayout(currentAgent);

    return null;
  };

  return (
    <Box
      sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAFAFA' }}
    >
      <Panel
        onAgentSelect={handleAgentSelect}
        onExpandChange={handlePanelExpandChange}
        onAgentCreate={handleCreateAgent}
        agents={agents}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
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
            backgroundColor: '#FFFFFF',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" component="h1" color="text.primary">
              Dashboard
            </Typography>

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

            <Tooltip title="Profile">
              <IconButton onClick={handleProfileClick} color="primary">
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {currentAgent && (
            <Box sx={{ mb: 4 }}>
              <Stack direction="column" spacing={1} alignItems="flex-start">
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {currentAgent.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={
                      currentAgent.type === 'support'
                        ? 'Support bot'
                        : 'Sales bot'
                    }
                    color="primary"
                    size="small"
                  />
                  <Chip label={`ID: ${currentAgent.id}`} size="small" />
                  <Typography variant="body2" color="text.secondary">
                    Created: {currentAgent.createdAt} · Last active:{' '}
                    {currentAgent.lastActiveAt}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          )}

          {renderAgentInfo()}
        </Container>
      </Box>

      <Dialog
        open={!!selectedSupportTicket}
        onClose={() => setSelectedSupportTicket(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedSupportTicket ? selectedSupportTicket.question : 'Ticket'}
        </DialogTitle>
        <DialogContent dividers>
          {selectedSupportTicket && (
            <>
              <Typography variant="body2" color="text.secondary" mb={2}>
                User: {selectedSupportTicket.user} ·{' '}
                {selectedSupportTicket.date}
              </Typography>
              <Stack spacing={2}>
                {selectedSupportTicket.chat.map((msg, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      textAlign: msg.sender === 'User' ? 'left' : 'right',
                    }}
                  >
                    <Chip
                      label={msg.sender}
                      color={msg.sender === 'User' ? 'default' : 'primary'}
                      size="small"
                      sx={{ mb: 0.5 }}
                    />
                    <Box
                      sx={{
                        display: 'inline-block',
                        maxWidth: '100%',
                        backgroundColor:
                          msg.sender === 'User' ? '#F5F5F5' : '#E3F2FD',
                        borderRadius: 2,
                        p: 1.25,
                      }}
                    >
                      <Typography variant="body2">{msg.text}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedSupportTicket(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!selectedSalesTicket}
        onClose={() => setSelectedSalesTicket(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedSalesTicket
            ? `Order from ${selectedSalesTicket.customerName}`
            : 'Sales ticket'}
        </DialogTitle>
        <DialogContent dividers>
          {selectedSalesTicket && (
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Customer</Typography>
              <Typography variant="body2">
                {selectedSalesTicket.customerName}
                <br />
                Email: {selectedSalesTicket.email}
                <br />
                Phone: {selectedSalesTicket.phone}
              </Typography>

              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                Product
              </Typography>
              <Typography variant="body2">
                {selectedSalesTicket.productName} (
                {selectedSalesTicket.productSku})
                <br />
                Quantity: {selectedSalesTicket.quantity}
                <br />
                Price per unit: {selectedSalesTicket.currency}
                {selectedSalesTicket.pricePerUnit}
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedSalesTicket(null)}>Close</Button>
        </DialogActions>
      </Dialog>
      <CreateAgentModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(agentData: any) => {
          handleCreateAgent(agentData);
          setIsCreateModalOpen(false);
        }}
      />
    </Box>
  );
}
