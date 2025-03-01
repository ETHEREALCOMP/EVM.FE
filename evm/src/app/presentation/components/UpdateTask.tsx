"use client";

import { useState } from "react";
import { updateTask, deleteTask } from "@/app/shared/api/tasks"; 
import { FaTrash } from "react-icons/fa"; 

interface Task {
  id: string;
  title: string;
  description?: string;
  status?: number;
}

interface TaskFormProps {
  task: Task;
  onTaskUpdated: () => void;
}

const UpdateTask = ({ task, onTaskUpdated }: TaskFormProps) => {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const updatedTask = await updateTask(task.id, { 
        title, 
        description, 
        status: task.status || 0
      });
      if (!updatedTask) throw new Error("Failed to update task.");
      onTaskUpdated();
      setIsUpdateModalOpen(false);
    } catch (err) {
      setError("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setLoading(true);
    setError("");

    try {
      const success = await deleteTask(task.id);
      if (!success) throw new Error("Failed to delete task.");

      onTaskUpdated();
    } catch (err) {
      setError("Failed to delete task.");
      console.error("Error in handleDelete:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        <button
          onClick={() => setIsUpdateModalOpen(true)}
          className="px-4 py-2 branding-dark-gray text-white rounded-md hover:opacity-95 transition"
        >
          Edit Task
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center justify-center"
          disabled={loading}
        >
          <FaTrash />
        </button>
      </div>

      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg w-96">
            <h2 className="text-lg text-gray-800 font-bold mb-2">Update Task</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-gray-800 p-2 border border-gray-300 rounded mb-2"
              />

              <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-gray-800 p-2 border border-gray-300 rounded mb-2"
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 branding-dark-gray text-white rounded-md hover:opacity-95 transition"
                >
                  {loading ? "Updating..." : "Update Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateTask;