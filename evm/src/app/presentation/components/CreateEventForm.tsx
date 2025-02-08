"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/app/shared/api/events";
import { FaPlus, FaSpinner } from "react-icons/fa";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const event = await createEvent(title, description, location);
      console.log(event);
      if (event?.id) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("Event not created");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name:</label>
            <input
              type="text"
              placeholder="Enter event name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description:</label>
            <textarea
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Location:</label>
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaPlus className="mr-2" />}
              {loading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
