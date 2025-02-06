export const createEvent = async (title: string, description: string, location: string) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const response = await fetch("https://localhost:7034/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, location }),
      credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = "Error creating event.";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
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

    const data = await response.json();
    console.log(data.data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
