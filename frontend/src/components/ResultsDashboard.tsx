import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Chip,
  Alert,
  Grid,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import type { VerifyResponse } from '../api';

interface ResultsDashboardProps {
  result: VerifyResponse;
  referenceImage: string;
  selfieImage: string;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, referenceImage, selfieImage }) => {
  const isMatch = result.verified;

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        {isMatch ? (
          <Alert 
            icon={<CheckCircleIcon sx={{ fontSize: 40 }} />} 
            severity="success" 
            variant="filled"
            sx={{ 
              py: 3, 
              borderRadius: 4,
              '& .MuiAlert-message': { width: '100%' }
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>VERIFIED</Typography>
            <Typography variant="body1">Identity confirmed with high confidence.</Typography>
          </Alert>
        ) : (
          <Alert 
            icon={<ErrorIcon sx={{ fontSize: 40 }} />} 
            severity="error" 
            variant="filled"
            sx={{ 
              py: 3, 
              borderRadius: 4,
              '& .MuiAlert-message': { width: '100%' }
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>NOT VERIFIED</Typography>
            <Typography variant="body1">Biometric mismatch detected. Identity could not be confirmed.</Typography>
          </Alert>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <Box sx={{ bgcolor: 'action.hover', py: 1, px: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2" color="textSecondary">REFERENCE ID</Typography>
            </Box>
            <CardContent sx={{ textAlign: 'center', p: 1 }}>
              <img 
                src={referenceImage} 
                alt="Reference" 
                style={{ width: '100%', height: '220px', objectFit: 'contain', borderRadius: '8px' }} 
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <Box sx={{ bgcolor: 'action.hover', py: 1, px: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2" color="textSecondary">LIVE SELFIE</Typography>
            </Box>
            <CardContent sx={{ textAlign: 'center', p: 1 }}>
              <img 
                src={selfieImage} 
                alt="Selfie" 
                style={{ width: '100%', height: '220px', objectFit: 'contain', borderRadius: '8px' }} 
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <SecurityIcon color="primary" />
              <Typography variant="h6">Biometric Analysis Results</Typography>
            </Stack>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={4} textAlign="center">
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>CONFIDENCE</Typography>
                <Typography variant="h4" color={isMatch ? "success.main" : "error.main"} sx={{ fontWeight: 'bold' }}>
                  {result.confidence}%
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>DISTANCE</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'medium' }}>{result.distance.toFixed(3)}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>THRESHOLD</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>{result.threshold}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} sx={{ mb: 1 }}>
                  <SpeedIcon fontSize="small" color="action" />
                  <Typography variant="caption" color="textSecondary">LATENCY</Typography>
                </Stack>
                <Typography variant="h4" sx={{ fontWeight: 'medium' }}>{result.time}s</Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider', display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
              <Chip label={`Model: ${result.model}`} variant="outlined" color="primary" />
              <Chip label={`Metric: ${result.similarity_metric}`} variant="outlined" />
              <Chip label={`Detector: ${result.detector_backend}`} variant="outlined" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResultsDashboard;