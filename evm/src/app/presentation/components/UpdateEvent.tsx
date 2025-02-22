"use client";
import { useState, useEffect } from "react";
import { updateEvent } from "@/app/shared/api/events";

interface EventFormProps {
  initialData: any;
  onSave: (eventData: any) => void;
}

const UpdateEvent = ({ initialData, onSave }: EventFormProps) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [isTicket, setIsTicket] = useState(initialData.isTicket || false);
  const [ticketPrice, setTicketPrice] = useState(initialData.ticketRequest?.price || 0);
  const [ticketLocation, setTicketLocation] = useState(initialData.ticketRequest?.location || "");
  const [ticketType, setTicketType] = useState(initialData.ticketRequest?.type || 0);

  const [isUpdateDirty, setIsUpdateDirty] = useState(false);

  useEffect(() => {
    const checkDirtyState = () => {
      const isDirty =
        title !== initialData.title ||
        description !== initialData.description ||
        location !== initialData.location ||
        isTicket !== initialData.isTicket ||
        (isTicket &&
          (ticketPrice !== initialData.ticketRequest?.price ||
            ticketLocation !== initialData.ticketRequest?.location ||
            ticketType !== initialData.ticketRequest?.type));
      setIsUpdateDirty(isDirty);
    };

    checkDirtyState();
  }, [title, description, location, isTicket, ticketPrice, ticketLocation, ticketType, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdateDirty) {
      const eventData = {
        title,
        description,
        location,
        isTicket,
        ...(isTicket && {
          ticketRequest: {
            price: ticketPrice,
            location: ticketLocation,
            type: ticketType,
          },
        }),
      };

      try {
        const updatedEvent = await updateEvent(initialData.id, eventData);
        if (updatedEvent) {
          onSave(updatedEvent);
        }
      } catch (error) {
        console.error("Failed to update event", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 text-sm font-medium">Name:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-gray-700 px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-medium">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-gray-700 px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-medium">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full text-gray-700 px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={isTicket} onChange={() => setIsTicket(!isTicket)} />
          <span className="text-gray-700 text-sm">Has Ticket</span>
        </label>
      </div>
      {isTicket && (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium">Ticket Price:</label>
            <input
              type="number"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(Number(e.target.value))}
              className="w-full text-gray-700 px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium">Ticket Location:</label>
            <input
              type="text"
              value={ticketLocation}
              onChange={(e) => setTicketLocation(e.target.value)}
              className="w-full text-gray-700 px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium">Ticket Type:</label>
            <input
              type="number"
              value={ticketType}
              onChange={(e) => setTicketType(Number(e.target.value))}
              className="w-full text-gray-700 px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mt-4">
        <button
          type="submit"
          className="w-full flex items-center justify-center branding-dark-gray text-white py-2 rounded-md hover:opacity-95 transition"
          disabled={!isUpdateDirty}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UpdateEvent;
