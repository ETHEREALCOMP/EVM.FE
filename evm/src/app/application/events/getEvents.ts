import { Event } from "@/app/domain/Event";

export const getEvents = (): Event[] => {
  const events: Event[] = [
    {
      id: "1",
      title: "Event 1",
      description: "Description of Event 1",
      date: "2025-02-01",
      location: "Location 1",
      type: "offline",
      participants: ["User 1", "User 2"],
      status: "planned",
    },
  ];

  return events;
};