import { CreateEventInput, Event } from "@/app/domain/Event";

export const createEvent = (input: CreateEventInput): Event => {
  const newEvent: Event = {
    id: Math.random().toString(36).substr(2, 9),
    ...input,
    participants: [],
    status: "planned",
  };


  return newEvent;
};