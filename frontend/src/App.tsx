import { useState } from 'react'
import { 
  Container, 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography, 
  Button, 
  Paper,
  LinearProgress,
  Alert,
  AlertTitle,
  useMediaQuery,
  useTheme
} from '@mui/material'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import ReferencePhotoCapture from './components/ReferencePhotoCapture'
import SelfieCapture from './components/SelfieCapture'
import ResultsDashboard from './components/ResultsDashboard'
import { verifyImages } from './api'
import type { VerifyResponse } from './api'

const steps = ['Reference Photo', 'Take Selfie', 'Results'];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyResponse | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      // Trigger Verification on final step
      await performVerification();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const performVerification = async () => {
    if (!referenceImage || !selfieImage) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await verifyImages(referenceImage, selfieImage);
      setResult(data);
      setActiveStep((prev) => prev + 1);
    } catch (err: unknown) {
      let msg = "An unexpected error occurred during verification.";
      if (axios.isAxiosError(err)) {
        const errorDetail = err.response?.data?.detail?.error;
        if (typeof errorDetail === 'string') {
          // Softened messaging for aggressive bypass strategy
          if (errorDetail.includes("Face could not be detected") || errorDetail.includes("Exception while processing")) {
            msg = "Verification failed. Please ensure you are centered, well-lit, and your face is clearly visible in both photos.";
          } else if (errorDetail.includes("image size")) {
            msg = "One of the images is too large. Please use a smaller photo.";
          } else {
            msg = errorDetail;
          }
        } else {
          msg = err.message;
        }
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError(null);
  };

  const handleReset = () => {
    setActiveStep(0);
    setReferenceImage(null);
    setSelfieImage(null);
    setResult(null);
    setError(null);
  };

  const isNextDisabled = () => {
    if (activeStep === 0 && !referenceImage) return true;
    if (activeStep === 1 && !selfieImage) return true;
    if (loading) return true;
    return false;
  };

  const renderStepContent = (step: number) => {
    if (loading) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>Analyzing Biometrics...</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
            Comparing reference photo with live selfie using VGG-Face model.
          </Typography>
          <LinearProgress />
        </Box>
      );
    }

    switch (step) {
      case 0:
        return (
          <ReferencePhotoCapture 
            onCapture={setReferenceImage} 
            initialImage={referenceImage} 
          />
        );
      case 1:
        return (
          <SelfieCapture 
            onCapture={setSelfieImage} 
            initialImage={selfieImage} 
          />
        );
      case 2:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Ready for Verification</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Both images captured. Click finish to start analysis.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 4 }}>
              <Box>
                <Typography variant="caption">Reference</Typography>
                <img src={referenceImage!} alt="Ref" style={{ width: 100, display: 'block', borderRadius: 4 }} />
              </Box>
              <Box>
                <Typography variant="caption">Selfie</Typography>
                <img src={selfieImage!} alt="Selfie" style={{ width: 100, display: 'block', borderRadius: 4 }} />
              </Box>
            </Box>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: { xs: 4, md: 8 } }}>
        <Typography variant="h4" align="center" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
          DeepFace Identity Verification
        </Typography>
        
        <Stepper activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'} sx={{ py: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            <AlertTitle>Verification Error</AlertTitle>
            {error}
          </Alert>
        )}

        <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 }, overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep + (loading ? '-loading' : '')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeStep === steps.length ? (
                <Box>
                  {result && (
                    <ResultsDashboard 
                      result={result} 
                      referenceImage={referenceImage!} 
                      selfieImage={selfieImage!} 
                    />
                  )}
                  <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button variant="outlined" onClick={handleReset}>
                      Start New Verification
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Box sx={{ minHeight: '350px' }}>
                    {renderStepContent(activeStep)}
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    {activeStep !== 0 && !loading && (
                      <Button onClick={handleBack} sx={{ mr: 1 }}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={isNextDisabled()}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </Box>
              )}
            </motion.div>
          </AnimatePresence>
        </Paper>
      </Box>
    </Container>
  )
}

export default App