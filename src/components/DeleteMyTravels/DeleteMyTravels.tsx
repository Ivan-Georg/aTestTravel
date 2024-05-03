import React from 'react';
import { deleteTravel } from "@/database";

interface DeleteMyTravelsProps {
  id: number;
  onDelete: (id: number) => void;
}

const DeleteMyTravels: React.FC<DeleteMyTravelsProps> = ({ id, onDelete }) => {
  const handleDelete = async () => {
    await deleteTravel(id);
    onDelete(id);
  }

  return (
    <button onClick={handleDelete} className="lined thin p-2 my-4">Delete</button>
  );
}

export default DeleteMyTravels;
