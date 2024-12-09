import React, { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTile: (tile: { date: string; message: string }) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAddTile }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [date, setDate] = React.useState("");
  const [message, setMessage] = React.useState("");

  // Automatically open and close the modal based on `isOpen` prop
  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.showModal(); // Opens the modal
      } else {
        modalRef.current.close(); // Closes the modal
      }
    }
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && message) {
      onAddTile({ date, message });

      // Clear form fields after adding the tile
      setDate("");
      setMessage("");
      onClose(); // Close the modal after adding the tile
    }
  };

  return (
    <dialog ref={modalRef} className="rounded-lg p-6 bg-white shadow-lg max-w-lg w-full">
      <h2 className="text-lg font-bold mb-4">Add New Tile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Message"
          className="border p-2 rounded mb-4 w-full"
        />
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Add Tile
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Modal;
