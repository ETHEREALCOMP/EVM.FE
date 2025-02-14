
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
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error creating task.");
      }
  
      return await response.json();
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };
  