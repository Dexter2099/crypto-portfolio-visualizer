import React, { useEffect, useState } from 'react';
import { getPortfolio } from './api';
import AddAssetForm from './components/AddAssetForm';
import PortfolioTable from './components/PortfolioTable';
import PortfolioChart from './components/PortfolioChart';
import './styles.css';


function App() {
  const [portfolio, setPortfolio] = useState([]);

  const fetchData = async () => {
    const res = await getPortfolio();
    setPortfolio(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>💰 Crypto Portfolio Visualizer</h1>
      <AddAssetForm onAdd={fetchData} />
      <PortfolioTable data={portfolio} onDelete={fetchData} />
      <PortfolioChart data={portfolio} />
    </div>
  );
}

export default App;
