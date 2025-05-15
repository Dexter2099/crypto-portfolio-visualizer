import axios from 'axios';

const API = 'http://localhost:5000/portfolio';

export const getPortfolio = () => axios.get(API);
export const addAsset = (data) => axios.post(API, data);
export const deleteAsset = (id) => axios.delete(`${API}/${id}`);
