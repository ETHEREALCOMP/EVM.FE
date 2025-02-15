import { json } from "stream/consumers";

export const createTask = async (title: string, description: string, eventId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");
  
      const response = await fetch("https://localhost:7034/event/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, eventId, status: 0 }),
        credentials: "include",
      });
  
      if (!response.ok) throw new Error("Error create task");

      const jsonData = await response.json();
      const data = jsonData.data;
  
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

export const getTasksByEventId = async (eventId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized");

    const response = await fetch(`https://localhost:7034/event/task/${eventId}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
       },
      credentials: "include"
  });

  if (!response.ok) throw new Error("Error getting task");

  const jsonData = await response.json();
  const data = jsonData.data.eTask;

  console.log(data);
  
  return data;
} catch (error) {
  console.error("Error:", error);
  return [];
}
};