import React, { useState } from 'react';
import { addAsset } from '../api';

export default function AddAssetForm({ onAdd }) {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [errors, setErrors] = useState({ quantity: false, buyPrice: false });
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const qty = parseFloat(quantity);
    const price = parseFloat(buyPrice);
    const newErrors = {
      quantity: isNaN(qty) || qty <= 0,
      buyPrice: isNaN(price) || price <= 0,
    };
    setErrors(newErrors);

    if (newErrors.quantity || newErrors.buyPrice) {
      setErrorMsg('Quantity and buy price must be positive numbers.');
      return;
    }

    setErrorMsg('');
    const normalizedSymbol = symbol.trim().toLowerCase();
    await addAsset({ symbol: normalizedSymbol, quantity: qty, buy_price: price });
    onAdd();
    setSymbol('');
    setQuantity('');
    setBuyPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Symbol (e.g. bitcoin - lowercase)"
        value={symbol}
        onChange={e => setSymbol(e.target.value)}
        required
      />
      <input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        className={errors.quantity ? 'input-error' : ''}
        required
      />
      <input
        placeholder="Buy Price"
        type="number"
        value={buyPrice}
        onChange={e => setBuyPrice(e.target.value)}
        className={errors.buyPrice ? 'input-error' : ''}
        required
      />
      <button type="submit">Add Asset</button>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </form>
  );
}
