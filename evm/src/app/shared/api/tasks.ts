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
  
  return data;
} catch (error) {
  console.error("Error:", error);
  return [];
}
};

export const updateTask = async (taskId: string, updatedData: Record<string, any>) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`https://localhost:7034/event/task/${taskId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        ...updatedData,
        status: updatedData.status || 0,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error updating task: ${errorText}`);
    }

    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    console.error("Error updating task:", error);
    return null;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`https://localhost:7034/event/task/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error deleting task: ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
};