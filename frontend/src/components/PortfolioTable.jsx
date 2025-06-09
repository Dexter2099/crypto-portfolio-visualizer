import React, { useState } from 'react';
import { deleteAsset } from '../api';
import { toast } from 'react-toastify';
import EditAssetForm from './EditAssetForm';

export default function PortfolioTable({ data, totals, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteAsset(id);
      toast.success('Asset removed');
      onDelete();
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove asset');
    }
  };

  const startEdit = (item) => {
    setEditing(item);
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  return (
    <div>
      {editing && (
        <EditAssetForm item={editing} onUpdate={onUpdate} onCancel={cancelEdit} />
      )}
      <table>
        <thead>
          <tr>
            <th>Symbol</th><th>Qty</th><th>Buy $</th><th>Now $</th><th>Value $</th><th>P/L $</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.symbol}</td>
              <td>{item.quantity}</td>
              <td>{item.buy_price}</td>
              <td>{item.current_price}</td>
              <td>{item.current_value}</td>
              <td style={{color: item.profit_loss >= 0 ? 'green' : 'red'}}>{item.profit_loss}</td>
              <td>
                <button onClick={() => startEdit(item)}>✏️</button>
                <button onClick={() => handleDelete(item.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total</td>
            <td>{totals.currentValue}</td>
            <td style={{color: totals.profitLoss >= 0 ? 'green' : 'red'}}>{totals.profitLoss}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
