import axios from 'axios';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface FacialArea {
  x: number;
  y: number;
  w: number;
  h: number;
  left_eye: [number, number] | null;
  right_eye: [number, number] | null;
}

export interface VerifyResponse {
  verified: boolean;
  distance: number;
  threshold: number;
  confidence: number;
  model: string;
  detector_backend: string;
  similarity_metric: string;
  facial_areas: {
    img1: FacialArea;
    img2: FacialArea;
  };
  time: number;
}

export const verifyImages = async (img1: string, img2: string): Promise<VerifyResponse> => {
  const response = await api.post<VerifyResponse>('/verify', {
    img1,
    img2,
  });
  return response.data;
};

export default api;