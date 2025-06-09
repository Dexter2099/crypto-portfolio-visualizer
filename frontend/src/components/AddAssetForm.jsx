import React, { useState, useEffect } from 'react';
import { addAsset, getCoins } from '../api';
import { toast } from 'react-toastify';

export default function AddAssetForm({ onAdd }) {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [coins, setCoins] = useState([]);
  const [errors, setErrors] = useState({ quantity: false, buyPrice: false });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadCoins() {
      try {
        const res = await getCoins();
        setCoins(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadCoins();
  }, []);

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
    try {
      await addAsset({ symbol: normalizedSymbol, quantity: qty, buy_price: price });
      toast.success('Asset added');
      onAdd();
      setSymbol('');
      setQuantity('');
      setBuyPrice('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add asset');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        list="coin-options"
        placeholder="Symbol (e.g. bitcoin)"
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
      <datalist id="coin-options">
        {coins.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} ({c.symbol})
          </option>
        ))}
      </datalist>
    </form>
  );
}
