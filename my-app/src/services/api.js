// Mock API service for asset management
const API_BASE_URL = 'http://localhost:3000/api';

// Stats API
export const getStats = async () => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  return response.json();
};

// Assets API
export const getAssets = async () => {
  const response = await fetch(`${API_BASE_URL}/assets`);
  if (!response.ok) {
    throw new Error('Failed to fetch assets');
  }
  return response.json();
};

export const createAsset = async (assetData) => {
  const response = await fetch(`${API_BASE_URL}/assets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assetData),
  });
  if (!response.ok) {
    throw new Error('Failed to create asset');
  }
  return response.json();
};

export const updateAsset = async (id, assetData) => {
  const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assetData),
  });
  if (!response.ok) {
    throw new Error('Failed to update asset');
  }
  return response.json();
};

export const deleteAsset = async (id) => {
  const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete asset');
  }
  return response.json();
};