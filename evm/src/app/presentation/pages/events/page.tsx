"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/app/shared/api/events";
import { EventType } from "@/app/shared/types/events"
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getEvents();
      console.log(data);
      setEvents(data.data);
    };
    loadEvents();
  }, []);

  return (
    <div className="container mx-8 p-6">
      <h1 className="text-3xl font-bold mb-4">List events</h1>

      <Link
        href="/presentation/pages/create-event"
        className="branding-white text-black text-lg font-bold px-4 py-2 rounded-lg mb-4 inline-block hover:bg-gray-200 transition"
      >
        + Create event
      </Link>

      
      <ul className="mt-6 space-y-4">
        {events.length > 0 ? (
          events.map((event: EventType) => (
            <li
              key={event.id}
              className="border p-4 rounded-lg shadow-md transition duration-300 hover:bg-white hover:text-black"
            >
              <Link href={`/presentation/pages/event/${event.id}`} className="block">
                <h3 className="text-lg font-semibold group-hover:text-black">
                  {event.name}
                </h3>
                <p className="text-xl group-hover:text-gray-700">
                  {event.description}
                </p>
              </Link>
            </li>
          ))
        ) : (
          <p className="text-white text-lg text-center">
            Try to create your future events that will lead you to fulfill your dreams ❤️
          </p>
        )}
      </ul>


    </div>
  );
}
