export type Message = {
  id: string;
  date: string;
  message: string;
};

export type ColumnData = {
  id: string;
  name: string;
  messages: Message[];
}

export interface ColumnProps {
  column: {
    id: string;
    name: string;
    messages: Message[];
  };
  onDrop: (e: React.DragEvent<HTMLDivElement>, columnId: string, index: number) => void;
}