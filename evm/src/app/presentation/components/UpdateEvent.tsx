"use client";
import { useState, useEffect } from "react";
import { updateEvent } from "@/app/shared/api/events";

interface EventFormProps {
  initialData: any;
  onSave: (eventData: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateEvent = ({ initialData, onSave, isOpen, onClose }: EventFormProps) => {
  const [title, setTitle] = useState(initialData.name || initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [isTicket, setIsTicket] = useState(initialData.isTicket || false);
  const [ticketPrice, setTicketPrice] = useState(initialData.ticketRequest?.price || 0);
  const [ticketLocation, setTicketLocation] = useState(initialData.ticketRequest?.location || "");
  const [ticketType, setTicketType] = useState(initialData.ticketRequest?.type || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isUpdateDirty, setIsUpdateDirty] = useState(false);

  useEffect(() => {
    const checkDirtyState = () => {
      const isDirty =
        title !== (initialData.name || initialData.title) ||
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
    if (!isUpdateDirty) return;

    setLoading(true);
    setError("");

    const eventData = {
      name: title,
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
        onSave({
          ...initialData, // Зберігаємо всі існуючі поля
          ...updatedEvent, // Оновлюємо тільки змінені поля
          name: title, // Переконуємося, що name оновлено
          description,
          location,
          isTicket,
          ticketRequest: isTicket ? {
            price: ticketPrice,
            location: ticketLocation,
            type: ticketType,
          } : undefined,
        });
        onClose();
      }
    } catch (error) {
      setError("Failed to update event");
      console.error("Failed to update event", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl text-gray-800 font-bold mb-4">Update Event</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}

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
              <input 
                type="checkbox" 
                checked={isTicket} 
                onChange={() => setIsTicket(!isTicket)} 
              />
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
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 branding-dark-gray text-white py-2 rounded-md hover:opacity-95 transition"
              disabled={!isUpdateDirty || loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;