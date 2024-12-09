import React from 'react';
import viteLogo from '../assets/vite.svg'; // Update the logo path if necessary

interface HeaderProps {
  isSorted: boolean; // Track if the tiles are sorted
  onToggleSort: () => void; // Function to toggle sorting
  onAddTile: () => void; // Function to add a new tile
}

const Header: React.FC<HeaderProps> = ({ isSorted, onToggleSort, onAddTile }) => {
  return (
    <header className="flex justify-between items-center mb-4 p-4 border-b border-gray-300">
      <div className="flex items-center">
        <img src={viteLogo} alt="Vite Logo" className="w-12 h-12 mr-4" />
        <h1 className="text-xl font-semibold">Drag-and-Drop Tiles</h1>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onToggleSort}
          className="bg-blue-500 text-white px-4 py-2 rounded transition duration-200 hover:bg-blue-600"
        >
          {isSorted ? 'Initial Order' : 'Sorted Order'}
        </button>
        <button
          onClick={onAddTile}
          className="bg-green-500 text-white px-4 py-2 rounded transition duration-200 hover:bg-green-600"
        >
          Add New Tile
        </button>
      </div>
    </header>
  );
};

export default Header;
