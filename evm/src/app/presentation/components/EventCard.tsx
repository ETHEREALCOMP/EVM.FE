import React from 'react';

interface EventCardProps {
  title: string;
  description: string;
  date: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, description, date }) => {
  return (
    <div className="event-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{date}</span>
    </div>
  );
};

export default EventCard;
