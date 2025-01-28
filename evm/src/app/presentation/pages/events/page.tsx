"use client";
import { useEffect, useState } from "react";
import { getEvents } from "@/app/application/events/getEvents";
import { Event } from "@/app/domain/Event";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const eventsData = getEvents();
    setEvents(eventsData);
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
