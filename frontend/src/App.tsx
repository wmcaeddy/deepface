import { useState } from 'react'
import { 
  Container, 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography, 
  Button, 
  Paper 
} from '@mui/material'
import ReferencePhotoCapture from './components/ReferencePhotoCapture'
import SelfieCapture from './components/SelfieCapture'

const steps = ['Reference Photo', 'Take Selfie', 'Results'];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setReferenceImage(null);
    setSelfieImage(null);
  };

  const isNextDisabled = () => {
    if (activeStep === 0 && !referenceImage) return true;
    if (activeStep === 1 && !selfieImage) return true;
    return false;
  };

  const renderStepContent = (step: number) => {
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
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          DeepFace Identity Verification
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ py: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
          {activeStep === steps.length ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Verification Process Complete
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 2 }}>
                Start New Verification
              </Button>
            </Box>
          ) : (
            <Box>
              <Box sx={{ minHeight: '350px' }}>
                {renderStepContent(activeStep)}
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                {activeStep !== 0 && (
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
        </Paper>
      </Box>
    </Container>
  )
}

export default App
