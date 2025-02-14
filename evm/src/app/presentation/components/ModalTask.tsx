"use client";

import { TaskModalProps } from "@/app/shared/types/tasks";

const TaskModal = ({ isOpen, onClose, children }: TaskModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default TaskModal;
