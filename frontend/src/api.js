import axios from 'axios';
import { toast } from 'react-toastify';

const API = 'http://localhost:5000/portfolio';

export const getPortfolio = async () => {
  try {
    return await axios.get(API);
  } catch (err) {
    toast.error('Failed to fetch portfolio');
    throw err;
  }
};

export const addAsset = async (data) => {
  try {
    return await axios.post(API, data);
  } catch (err) {
    toast.error('Failed to add asset');
    throw err;
  }
};

export const deleteAsset = async (id) => {
  try {
    return await axios.delete(`${API}/${id}`);
  } catch (err) {
    toast.error('Failed to remove asset');
    throw err;
  }
};

export const updateAsset = async (id, data) => {
  try {
    return await axios.put(`${API}/${id}`, data);
  } catch (err) {
    toast.error('Failed to update asset');
    throw err;
  }
};
