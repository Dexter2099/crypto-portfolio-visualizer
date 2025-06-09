import React, { useState } from 'react';
import { updateAsset } from '../api';
import { toast } from 'react-toastify';

export default function EditAssetForm({ item, onUpdate, onCancel }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [buyPrice, setBuyPrice] = useState(item.buy_price);
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
    try {
      await updateAsset(item.id, { quantity: qty, buy_price: price });
      toast.success('Asset updated');
      onUpdate();
      onCancel();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update asset');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className={errors.quantity ? 'input-error' : ''}
        required
      />
      <input
        placeholder="Buy Price"
        type="number"
        value={buyPrice}
        onChange={(e) => setBuyPrice(e.target.value)}
        className={errors.buyPrice ? 'input-error' : ''}
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </form>
  );
}

