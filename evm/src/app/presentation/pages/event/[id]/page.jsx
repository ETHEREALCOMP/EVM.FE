"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventById, deleteEventById } from "@/app/shared/api/events";
import { getTasksByEventId } from "@/app/shared/api/tasks";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import AddTaskForm from "@/app/presentation/components/AddTaskForm";
import TaskModal from "@/app/presentation/components/ModalTask";
import UpdateEvent from "@/app/presentation/components/UpdateEvent";
import UpdateTask from "@/app/presentation/components/UpdateTask";

export default function EventPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [event, setEvent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await getEventById(id);
        if (!eventData) throw new Error("Event not found");
        setEvent(eventData);

        const taskData = await getTasksByEventId(id);
        setTasks(taskData);
      } catch (err) {
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDeleteEvent = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEventById(id);
      router.push("/presentation/pages/events");
    } catch (error) {
      alert("Error deleting event");
    }
  };

  const handleTaskAdded = async () => {
    setIsModalOpen(false);
    try {
      const updatedTasks = await getTasksByEventId(id);
      setTasks(updatedTasks);
    } catch (err) {
      console.error("Failed to refresh tasks", err);
    }
  };

  const handleTaskUpdated = async () => {
    try {
      const updatedTasks = await getTasksByEventId(id);
      setTasks(updatedTasks);
    } catch (err) {
      console.error("Failed to refresh tasks", err);
    }
  };

  const handleEventUpdated = (updatedEventData) => {
    setEvent(updatedEventData);
    setIsUpdateModalOpen(false);
  };

  if (loading) return <p className="text-center text-gray-700">Loading event...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!event) return <p className="text-center text-gray-700">Event not found.</p>;

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800">{event.name}</h1>
        <p className="text-gray-600 mt-2">{event.description}</p>
        <div className="mt-4 flex items-center text-gray-700">
          <FaCalendarAlt className="mr-2 text-blue-600" />
          <span>{event.date || "No date specified"}</span>
        </div>
        <div className="mt-2 flex items-center text-gray-700">
          <FaMapMarkerAlt className="mr-2 text-red-600" />
          <span>{event.location || "No location specified"}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl text-gray-700 font-semibold mb-4">Tasks</h2>
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li 
                key={task.id} 
                className="p-3 bg-gray-100 rounded-md shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg text-gray-700 font-bold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                </div>
                <UpdateTask task={task} onTaskUpdated={handleTaskUpdated} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No tasks added yet.</p>
        )}
      </div>
      
      <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg flex gap-4">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 branding-dark-gray text-white rounded-md hover:opacity-95 transition"
        >
          Add Task
        </button>

        <button 
          onClick={() => setIsUpdateModalOpen(true)}
          className="px-4 py-2 branding-dark-gray text-white rounded-md hover:opacity-95 transition"
        >
          Update Event
        </button>
        
        <button 
          onClick={handleDeleteEvent}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Delete Event
        </button>

      </div>
      
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddTaskForm eventId={id} onTaskAdded={handleTaskAdded} />
      </TaskModal>
      
      <UpdateEvent 
        initialData={event} 
        onSave={handleEventUpdated}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />
    </div>
  );
}