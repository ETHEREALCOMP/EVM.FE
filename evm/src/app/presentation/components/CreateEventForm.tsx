"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/app/shared/api/events";

const CreateEventForm = () => {
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
      const eventData = { title, description, location };
      const newEvent = await createEvent(eventData);

      console.log("Event created:", newEvent);

      if (newEvent?.id) {
        console.log("Та все працює");
        router.push(`/`);
      }
    } catch (err) {
      console.error(err);
      setError("Event not created");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md">
          <h2 className="text-2xl text-gray-800 font-bold font-bold mb-4">Create event</h2>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-gray-700 px-3 py-2 mb-3 border border-gray-500 rounded-md"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-gray-700 px-3 py-2 mb-3 border border-gray-500 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-gray-700 px-3 py-2 mb-3 border border-gray-500 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
