import React, { useEffect, useState } from 'react';
import { getPortfolio } from './api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAssetForm from './components/AddAssetForm';
import PortfolioTable from './components/PortfolioTable';
import PortfolioChart from './components/PortfolioChart';
import './styles.css';


function App() {
  const [portfolio, setPortfolio] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getPortfolio();
      setPortfolio(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch portfolio');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>💰 Crypto Portfolio Visualizer</h1>
      <AddAssetForm onAdd={fetchData} />
      <PortfolioTable data={portfolio} onDelete={fetchData} onUpdate={fetchData} />
      <PortfolioChart data={portfolio} />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
