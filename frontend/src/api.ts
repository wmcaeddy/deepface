import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface VerifyResponse {
  verified: boolean;
  distance: number;
  threshold: number;
  confidence: number;
  model: string;
  detector_backend: string;
  similarity_metric: string;
  facial_areas: {
    img1: any;
    img2: any;
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
