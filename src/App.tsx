import React, { useState } from "react";
import { Column } from "./components/Column";
import { input } from "./data/message";
import Header from "./components/Headers";
import Modal from "./components/Modal";
import { ColumnData, Message } from "./types";


// Group messages by year
const groupMessagesByYear = (messages: Message[]) => {
  const grouped: { [key: string]: Message[] } = {};

  messages.forEach((message) => {
    const year = message.date.split("-")[0]; // Get the year from the date string
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(message);
  });

  return Object.keys(grouped).map((year) => ({
    id: year,
    name: year,
    messages: grouped[year],
  }));
};

const App = () => {
  const [columns, setColumns] = useState<ColumnData[]>(groupMessagesByYear(input));
  const [isSorted, setIsSorted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    columnId: string,
    index: number
  ) => {
    e.preventDefault();
    const messageId = e.dataTransfer.getData("messageId");

    const message = columns
      .flatMap((col) => col.messages)
      .find((msg) => msg.id === messageId);

    if (!message) return;

    // Ensure that the message is dropped in the correct year column
    if (message.date.split("-")[0] !== columnId) return; // Prevent drop if years don't match

    const updatedColumns = columns.map((column) => {
      if (column.messages.find((msg) => msg.id === messageId)) {
        return {
          ...column,
          messages: column.messages.filter((msg) => msg.id !== messageId),
        };
      }
      return column;
    });

    const newColumns = updatedColumns.map((column) => {
      if (column.id === columnId) {
        const newMessages = [...column.messages];
        newMessages.splice(index, 0, message);
        return { ...column, messages: newMessages };
      }
      return column;
    });

    setColumns(newColumns);
  };

 const onToggleSort = () => {
  setIsSorted((prevIsSorted) => {
    const newSortOrder = !prevIsSorted;
    const sortedColumns = [...columns];

    if (newSortOrder) {
      sortedColumns.forEach((column) => {
        column.messages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      });
    } else {
      const originalColumns = groupMessagesByYear(input);
      sortedColumns.forEach((column, index) => {
        column.messages = originalColumns[index].messages;
      });
    }

    setColumns(sortedColumns);
    return newSortOrder; // Update the sort state
  });
};


  const onAddTile = (tile: { date: string; message: string }) => {
    const newMessage: Message = {
      id: `${new Date().getTime()}`,
      date: tile.date,
      message: tile.message,
    };

    const updatedColumns = [...columns];
    const year = tile.date.split("-")[0];
    const targetColumn = updatedColumns.find((col) => col.id === year);

    if (targetColumn) {
      targetColumn.messages.push(newMessage);
    } else {
      updatedColumns.push({
        id: year,
        name: year,
        messages: [newMessage],
      });
    }

    setColumns(updatedColumns);
  };

  return (
    <>
      <Header
        isSorted={isSorted}
        onToggleSort={onToggleSort}
        onAddTile={() => setIsModalOpen(true)}
      />
      <div className="flex flex-wrap gap-4 p-8">
        {columns.map((column) => (
          <Column key={column.id} column={column} onDrop={handleDrop} />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTile={onAddTile}
      />
    </>
  );
};


export default App;
