import React, { useState } from 'react';
import { addAsset } from '../api';

export default function AddAssetForm({ onAdd }) {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAsset({ symbol, quantity: parseFloat(quantity), buy_price: parseFloat(buyPrice) });
    onAdd();
    setSymbol('');
    setQuantity('');
    setBuyPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Symbol (e.g. bitcoin)" value={symbol} onChange={e => setSymbol(e.target.value)} required />
      <input placeholder="Quantity" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required />
      <input placeholder="Buy Price" type="number" value={buyPrice} onChange={e => setBuyPrice(e.target.value)} required />
      <button type="submit">Add Asset</button>
    </form>
  );
}
