import React from 'react';
import EventCard from './EventCard';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};

export default EventList;
