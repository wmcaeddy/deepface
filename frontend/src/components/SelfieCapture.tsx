import React, { useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useFaceDetection } from 'react-use-face-detection/build/index';
import * as FaceDetection from '@mediapipe/face_detection';
import { 
  Box, 
  Button, 
  Typography, 
  Paper,
  Alert,
  CircularProgress,
  LinearProgress
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
  const [imgSrc, setImgSrc] = useState<string | null>(initialImage || null);
  const [error, setError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadTimeout, setLoadTimeout] = useState(false);

  const isSecureContext = window.isSecureContext;

  const { webcamRef, detected, isLoading } = useFaceDetection({
    faceDetectionOptions: {
      model: 'short',
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
  });

  // Handle loading timeout
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoadTimeout(true);
      }, 15000); // 15 seconds timeout
      return () => clearTimeout(timer);
    } else {
      setLoadTimeout(false);
    }
  }, [isLoading]);

  const capture = useCallback(() => {
    // Access the actual webcam instance from the ref provided by the hook
    // @ts-ignore - webcamRef can be a callback ref or RefObject
    const webcam = webcamRef?.current as Webcam | null;
    const imageSrc = webcam?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      onCapture(imageSrc);
      setIsCapturing(false);
      setProgress(0);
    }
  }, [webcamRef, onCapture]);

  // Auto-capture logic
  useEffect(() => {
    if (imgSrc || isLoading || !detected) {
      setIsCapturing(false);
      setProgress(0);
      return;
    }

    setIsCapturing(true);
    
    // Animate progress bar over 1.5s
    const startTime = Date.now();
    const duration = 1500;
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (elapsed >= duration) {
        clearInterval(interval);
        capture();
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [detected, imgSrc, isLoading, capture]);

  const handleUserMediaError = useCallback((err: string | DOMException) => {
    console.error("Webcam error:", err);
    if (!isSecureContext) {
      setError("Camera access requires a Secure Context (HTTPS or localhost). Since you are accessing via a network IP, your browser has blocked the camera.");
    } else {
      setError("Could not access camera. Please ensure you have granted permission and no other application is using it.");
    }
  }, [isSecureContext]);

  const retake = () => {
    setImgSrc(null);
    setError(null);
    setIsCapturing(false);
    setProgress(0);
  };

  const handleManualCapture = () => {
    // Fallback to manual capture if AI fails to load
    // @ts-ignore
    const webcam = webcamRef?.current as Webcam | null;
    const imageSrc = webcam?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      onCapture(imageSrc);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Take a Selfie
      </Typography>

      {loadTimeout && !imgSrc && (
        <Alert severity="warning" sx={{ mb: 2, textAlign: 'left' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            AI Model Loading is taking longer than expected.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            This can happen due to slow network or browser restrictions. You can try to refresh or use manual capture below.
          </Typography>
          <Button 
            variant="outlined" 
            color="warning" 
            size="small" 
            onClick={() => window.location.reload()}
            sx={{ mt: 1, mr: 1 }}
          >
            Refresh Page
          </Button>
          <Button 
            variant="contained" 
            color="warning" 
            size="small" 
            onClick={handleManualCapture}
            sx={{ mt: 1 }}
          >
            Manual Capture
          </Button>
        </Alert>
      )}

      {!isSecureContext && (
        <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Insecure Origin Detected: Browser blocks camera access
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Modern browsers only allow camera access on <code>https://</code> or <code>localhost</code>. 
            To allow this IP (<code>{window.location.hostname}</code>) in Chrome/Edge:
          </Typography>
          <ol style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Open a new tab and go to: <code>chrome://flags/#unsafely-treat-insecure-origin-as-secure</code></li>
            <li>Enable the flag.</li>
            <li>Add <code>{window.location.origin}</code> to the text area.</li>
            <li>Relaunch the browser.</li>
          </ol>
        </Alert>
      )}

      {error ? (
        <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
          {error}
        </Alert>
      ) : (
        <Alert severity={detected ? "success" : "warning"} sx={{ mb: 3, textAlign: 'left' }}>
          <Typography variant="body2">
            <strong>{detected ? "Face Detected!" : "Live Capture Instructions:"}</strong>
            <ul>
              <li>Center your face within the dashed oval guide for an accurate match.</li>
              <li>{detected ? <strong>Hold steady! Capturing...</strong> : "Look directly at the camera and keep a neutral expression."}</li>
              {!detected && <li>The system will automatically capture once you are aligned.</li>}
            </ul>
          </Typography>
          {isCapturing && (
            <Box sx={{ width: '100%', mt: 1 }}>
              <LinearProgress variant="determinate" value={progress} color="success" />
            </Box>
          )}
        </Alert>
      )}

      <Paper 
        variant="outlined" 
        sx={{ 
          p: 1, 
          mb: 3, 
          overflow: 'hidden', 
          backgroundColor: '#000',
          position: 'relative',
          lineHeight: 0,
          borderRadius: 4,
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isLoading && !imgSrc && (
          <Box sx={{ position: 'absolute', zIndex: 5, textAlign: 'center', color: 'white' }}>
            <CircularProgress color="inherit" sx={{ mb: 2 }} />
            <Typography variant="body2">Loading AI Models...</Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>This may take a moment on the first load</Typography>
          </Box>
        )}

        {imgSrc ? (
          <img 
            src={imgSrc} 
            alt="Selfie" 
            style={{ width: '100%', borderRadius: '4px' }} 
          />
        ) : (
          <Box sx={{ position: 'relative', width: '100%', opacity: isLoading ? 0.3 : 1 }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMediaError={handleUserMediaError}
              style={{ width: '100%', borderRadius: '4px' }}
            />
            {!error && (!isLoading || loadTimeout) && (
              <>
                {/* Face Oval Guide */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    height: '75%',
                    aspectRatio: '3 / 4',
                    border: '3px dashed',
                    borderColor: isCapturing ? 'success.main' : 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '50% / 50%',
                    pointerEvents: 'none',
                    boxShadow: '0 0 0 1000px rgba(0, 0, 0, 0.3)',
                    transition: 'border-color 0.2s',
                    animation: isCapturing ? 'pulse 1.5s infinite' : 'none',
                    '@keyframes pulse': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                      '100%': { opacity: 1 },
                    },
                  }}
                />
                
                {isCapturing && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                    }}
                  >
                    <Typography 
                      variant="h1" 
                      sx={{ 
                        color: 'white', 
                        fontWeight: 'bold',
                        textShadow: '0 0 20px rgba(0,0,0,0.8)'
                      }}
                    >
                      📸
                    </Typography>
                  </Box>
                )}
              </>
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
            color={detected ? "success" : "primary"}
            startIcon={<CameraAltIcon />}
            size="large"
            disabled={!loadTimeout || isLoading}
            onClick={handleManualCapture}
          >
            {isLoading ? "Initializing AI..." : detected ? "Capturing..." : "Waiting for Face..."}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SelfieCapture;
