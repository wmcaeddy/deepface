import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Divider, 
  Chip,
  Alert
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { VerifyResponse } from '../api';

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
          <Alert icon={<CheckCircleIcon fontSize="inherit" />} severity="success" sx={{ py: 2 }}>
            <Typography variant="h5">Identity Verified Successfully</Typography>
          </Alert>
        ) : (
          <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error" sx={{ py: 2 }}>
            <Typography variant="h5">Identity Verification Failed</Typography>
          </Alert>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Reference Photo
            </Typography>
            <img 
              src={referenceImage} 
              alt="Reference" 
              style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px' }} 
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Live Selfie
            </Typography>
            <img 
              src={selfieImage} 
              alt="Selfie" 
              style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px' }} 
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Verification Metrics</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="textSecondary">Confidence</Typography>
                <Typography variant="h5" color={isMatch ? "success.main" : "error.main"}>
                  {result.confidence}%
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="textSecondary">Distance</Typography>
                <Typography variant="h5">{result.distance.toFixed(4)}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="textSecondary">Threshold</Typography>
                <Typography variant="h5">{result.threshold}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="textSecondary">Process Time</Typography>
                <Typography variant="h5">{result.time}s</Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip label={`Model: ${result.model}`} variant="outlined" size="small" />
              <Chip label={`Metric: ${result.similarity_metric}`} variant="outlined" size="small" />
              <Chip label={`Detector: ${result.detector_backend}`} variant="outlined" size="small" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResultsDashboard;
