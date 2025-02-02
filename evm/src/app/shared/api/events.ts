const API_URL = "https://localhost:7034/event";

export const createEvent = async (title: string, description: string, location: string) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, location }),
      credentials: "include",
    });

    if (!response.ok) {
      let errorMessage = "Error creating event.";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL);

    if (!response.ok) throw new Error("Incorect getting events");
    return await response.json();
  } catch (error) {
    console.error("rror:", error);
    return [];
  }
};