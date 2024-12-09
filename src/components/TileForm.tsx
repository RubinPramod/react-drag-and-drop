import React, { useState } from 'react';

interface TileFormProps {
  onAddTile: (tile: { date: string; message: string }) => void;
}

const TileForm: React.FC<TileFormProps> = ({ onAddTile }) => {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && message) {
      onAddTile({ date, message });
      setDate('');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow-md rounded">
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
        required 
        className="border p-2 rounded mr-2"
      />
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        required 
        placeholder="Message" 
        className="border p-2 rounded mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
};

export default TileForm;