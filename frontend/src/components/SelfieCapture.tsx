import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { 
  Box, 
  Button, 
  Typography, 
  Paper,
  Fade,
  Alert
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ReplayIcon from '@mui/icons-material/Replay';

interface SelfieCaptureProps {
  onCapture: (image: string) => void;
  initialImage?: string | null;
}

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const SelfieCapture: React.FC<SelfieCaptureProps> = ({ onCapture, initialImage }) => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(initialImage || null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  const startCountdown = () => {
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      capture();
      setCountdown(null);
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, capture]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Take a Selfie
      </Typography>

      <Alert severity="warning" sx={{ mb: 3, textAlign: 'left' }}>
        <Typography variant="body2">
          <strong>Live Capture Instructions:</strong>
          <ul>
            <li>Center your face within the dashed oval guide.</li>
            <li>Look directly at the camera and keep a neutral expression.</li>
            <li>Wait for the 3-second countdown to finish.</li>
          </ul>
        </Typography>
      </Alert>

      <Paper 
        variant="outlined" 
        sx={{ 
          p: 1, 
          mb: 3, 
          overflow: 'hidden', 
          backgroundColor: '#000',
          position: 'relative',
          lineHeight: 0,
          borderRadius: 4
        }}
      >
        {imgSrc ? (
          <img 
            src={imgSrc} 
            alt="Selfie" 
            style={{ width: '100%', borderRadius: '4px' }} 
          />
        ) : (
          <Box sx={{ position: 'relative' }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{ width: '100%', borderRadius: '4px' }}
            />
            {/* Face Oval Guide */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                height: '80%',
                border: '3px dashed rgba(255, 255, 255, 0.6)',
                borderRadius: '50% / 50%',
                pointerEvents: 'none',
                boxShadow: '0 0 0 1000px rgba(0, 0, 0, 0.3)',
              }}
            />
            {/* Countdown Overlay */}
            {countdown !== null && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }}
              >
                <Fade in={true} key={countdown}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 'bold',
                      textShadow: '0 0 20px rgba(0,0,0,0.8)'
                    }}
                  >
                    {countdown > 0 ? countdown : '📸'}
                  </Typography>
                </Fade>
              </Box>
            )}
          </Box>
        )}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {imgSrc ? (
          <Button
            variant="outlined"
            startIcon={<ReplayIcon />}
            onClick={retake}
          >
            Retake
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<CameraAltIcon />}
            onClick={startCountdown}
            size="large"
            disabled={countdown !== null}
          >
            {countdown !== null ? `Capturing in ${countdown}...` : 'Start Capture'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SelfieCapture;
