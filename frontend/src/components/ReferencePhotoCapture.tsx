import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  styled 
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface ReferencePhotoCaptureProps {
  onCapture: (image: string) => void;
  initialImage?: string | null;
}

const ReferencePhotoCapture: React.FC<ReferencePhotoCaptureProps> = ({ onCapture, initialImage }) => {
  const [preview, setPreview] = useState<string | null>(initialImage || null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onCapture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Upload Reference Photo
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Please upload a clear photo of the person you want to verify.
      </Typography>

      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          mb: 3, 
          minHeight: '200px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#fafafa',
          borderStyle: 'dashed'
        }}
      >
        {preview ? (
          <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <img 
              src={preview} 
              alt="Reference Preview" 
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} 
            />
          </Box>
        ) : (
          <Box sx={{ opacity: 0.5 }}>
            <CloudUploadIcon sx={{ fontSize: 64, mb: 1 }} />
            <Typography>No image selected</Typography>
          </Box>
        )}
      </Paper>

      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        {preview ? 'Change Photo' : 'Upload Photo'}
        <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
      </Button>
    </Box>
  );
};

export default ReferencePhotoCapture;
