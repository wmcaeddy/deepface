import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  IconButton 
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

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Take a Selfie
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Position your face within the frame and click capture.
      </Typography>

      <Paper 
        variant="outlined" 
        sx={{ 
          p: 1, 
          mb: 3, 
          overflow: 'hidden', 
          backgroundColor: '#000',
          position: 'relative',
          lineHeight: 0
        }}
      >
        {imgSrc ? (
          <img 
            src={imgSrc} 
            alt="Selfie" 
            style={{ width: '100%', borderRadius: '4px' }} 
          />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{ width: '100%', borderRadius: '4px' }}
          />
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
            onClick={capture}
            size="large"
          >
            Capture
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SelfieCapture;
