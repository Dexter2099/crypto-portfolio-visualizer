import axios from 'axios';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_API_URL;
const COINS_API = API.replace(/\/portfolio$/, '') + '/coins';

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

export const getCoins = async () => {
  try {
    return await axios.get(COINS_API);
  } catch (err) {
    toast.error('Failed to fetch coins');
    throw err;
  }
};
