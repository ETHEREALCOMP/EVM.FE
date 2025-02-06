"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/app/shared/api/events";
import { EventType } from "@/app/shared/types/events";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getEvents();
      setEvents(data.data);
    };
    loadEvents();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">List events</h1>

      <Link
        href="/presentation/pages/create-event"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 inline-block"
      >
        + Create event
      </Link>

      <ul className="mt-4 space-y-4">
        {events.length > 0 ? (
          events.map((event) => (
            <li
              key={event.id}
              className="border p-4 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              <Link href={`/event/${event.id}`} className="text-xl font-bold">
                {event.title}
              </Link>
              <p className="text-gray-600">{event.description}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">😔 No events available</p>
        )}
      </ul>
    </div>
  );
}
