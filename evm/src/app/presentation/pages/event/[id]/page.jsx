"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEventById } from "@/app/shared/api/events";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        if (!data) throw new Error("Event not found");
        setEvent(data.data);
      } catch (err) {
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center text-gray-700">Loading event...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!event) return <p className="text-center text-gray-700">Event not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800">{event.name}</h1>
      <p className="text-gray-600 mt-2">{event.description}</p>

      <div className="mt-4 flex items-center text-gray-700">
        <FaCalendarAlt className="mr-2 text-blue-600" />
        <span>{event.date || "No date specified"}</span>
      </div>

      <div className="mt-2 flex items-center text-gray-700">
        <FaMapMarkerAlt className="mr-2 text-red-600" />
        <span>{event.location || "No location specified"}</span>
      </div>
    </div>
  );
}
