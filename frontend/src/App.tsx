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

const steps = ['Reference Photo', 'Take Selfie', 'Results'];

function App() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
              <Box sx={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1">
                  Placeholder for: {steps[activeStep]}
                </Typography>
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