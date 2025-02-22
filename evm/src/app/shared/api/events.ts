import { CreateEventRequest } from "@/app/shared/types/events";

export const createEvent = async (eventData: CreateEventRequest) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const response = await fetch("https://localhost:7034/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
      credentials: "include",
    });

    const jsonData = await response.json();

    const data = jsonData.data;
    console.log(data);
    if (!response.ok) {
      throw new Error(jsonData.message || "Error creating event.");
    }

    return data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const updateEvent = async (eventId: string, eventData: any) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`https://localhost:7034/event/${eventId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(eventData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error updating event: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


export const getEvents = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("https://localhost:7034/event", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
       },
      credentials: "include"
  })

    if (!response.ok) throw new Error("Error getting events");

    const jsonData = await response.json();
    const data = jsonData.data;

    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getEventById = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`https://localhost:7034/event/${id}`, { 
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
       },
      credentials: "include"
  })

    if (!response.ok) throw new Error("Error getting events");

    const jsonData = await response.json();
    const data = jsonData.data;

    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const deleteEventById = async (id: string) => {
  try {
    const response = await fetch(`https://localhost:7034/event/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to delete event");
    
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};