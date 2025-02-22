"use client";

import { useState } from "react";
import { updateTask } from "@/app/shared/api/tasks";

interface Task {
  id: string;
  title: string;
  description?: string;
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
      const updatedTask = await updateTask(task.id, { title, description });
      if (!updatedTask) throw new Error("Failed to update task.");

      onTaskUpdated();
      setIsUpdateModalOpen(false);
    } catch (err) {
      setError("Failed to update task.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>  
        <button
            onClick={() => setIsUpdateModalOpen(true)}
            className="px-4 py-2 mx-2 branding-dark-gray text-white rounded-md hover:opacity-95 transition"
        >
            Edit Task
        </button>

        <button
            onClick={() => setIsUpdateModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
            Delete
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
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 branding-dark-gray text-white py-2 rounded-md hover:opacity-95 transition"
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