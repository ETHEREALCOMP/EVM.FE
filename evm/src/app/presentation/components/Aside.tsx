import React from "react";

const eventsMock = [
  { id: 1, name: "Hackathon 2025" },
  { id: 2, name: "IT Conference" },
  { id: 3, name: "React Meetup" },
];

const Aside = () => {
  return (
    <aside className="w-64 branding-white text-white p-6 hidden md:block rounded-lg">
      <h2 className="text-xl text-black font-bold mb-4">Upcoming Events</h2>
      <ul className="space-y-2">
        {eventsMock.map((event) => (
          <li key={event.id} className="branding-dark-gray p-2 rounded hover:bg-gray-900">
            {event.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;