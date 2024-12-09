/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { ColumnProps } from '../types';



export const Column: React.FC<ColumnProps> = ({ column, onDrop }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null); // Track hover position
  const [dragging, setDragging] = useState<boolean>(false); // Track if drag is happening

  // Handle drag over to show hover feedback
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number | null) => {
    e.preventDefault();
    setHoverIndex(index);
  };

  const handleDragLeave = () => {
    setHoverIndex(null);
  };

  const handleColumnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (hoverIndex === null) return;

    const messageId = e.dataTransfer.getData('messageId');
    const message = column.messages.find((msg) => msg.id === messageId);

    if (!message) return;

    onDrop(e, column.id, hoverIndex); // Call onDrop when the message is dropped
  };

  // console.log(column)

  return (
    <div
      className="w-full sm:w-64 bg-gray-200 p-4 rounded-lg shadow-md"
      onDragOver={(e) => e.preventDefault()} // Allow drag over for the entire column
      onDrop={handleColumnDrop} // Handle drop on the column
      onDragLeave={handleDragLeave}
    >
      <h2 className="text-lg font-bold mb-4 text-gray-800">{column.name}</h2>

      <div className="space-y-4 relative" onDragOver={(e) => e.preventDefault()}>
        <div
          className={`h-6 bg-transparent ${
            hoverIndex === null ? 'border-t-4 border-dashed border-gray-400' : ''
          }`}
          onDragOver={(e) => handleDragOver(e, 0)} // Hover effect at the top
        ></div>

        {column.messages.map((message, index) => (
          <div
            key={message.id}
            className={`bg-white p-4 rounded shadow transition-all duration-200 ease-in-out ${
              hoverIndex === index + 1 ? 'bg-gray-300 border-2 border-black' : ''
            }`}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('messageId', message.id);
              setDragging(true);
            }}
            onDragEnd={() => setDragging(false)}
            onDragOver={(e) => handleDragOver(e, index + 1)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              e.stopPropagation();
              onDrop(e, column.id, index + 1);
            }}
          >
            <div className="text-sm text-gray-600">{message.date}</div>
            <div className="font-medium text-gray-900">{message.message}</div>
          </div>
        ))}

        <div
          className={`h-6 bg-transparent ${
            hoverIndex === column.messages.length + 1 ? 'border-b-4 border-dashed border-gray-400' : ''
          }`}
          onDragOver={(e) => handleDragOver(e, column.messages.length + 1)} // Hover effect at the bottom
        ></div>
      </div>
    </div>
  );
};


