"use client";

import { useState } from "react";
import { createTask } from "@/app/shared/api/tasks";

const AddTaskForm = ({ eventId, onTaskAdded }: { eventId: string; onTaskAdded: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createTask(title, description, eventId);
      setTitle("");
      setDescription("");
      onTaskAdded();
    } catch (err) {
      setError("Failed to create task.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg">
      <h2 className="text-lg text-gray-700 font-bold mb-2">Add New Task</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-gray-700 p-2 border border-gray-300 rounded mb-2"
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full text-gray-700 p-2 border border-gray-300 rounded mb-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full branding-dark-gray text-white py-2 rounded-md hover:opacity-95 transition"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default AddTaskForm;
