export const createTask = async (title: string, description: string) => {
    try {
      const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];
  
      if (!token) throw new Error("No token found");
  
      const response = await fetch("https://localhost:7034/event/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
        credentials: "include",
      });
  
      if (!response.ok) throw new Error("Error creating task");
  
      return await response.json();
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };
  
  export const deleteTask = async (taskId: string) => {
    try {
      const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];
  
      if (!token) throw new Error("No token found");
  
      const response = await fetch(`https://localhost:7034/task/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });
  
      if (!response.ok) throw new Error("Error deleting task");
  
      return { success: true };
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };
  