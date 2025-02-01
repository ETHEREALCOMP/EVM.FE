import { EventData } from "@/app/shared/types/events";

const API_URL = "http://localhost:7034";

export const createEvent = async (eventData: EventData) => {
  try {
    console.log("Requesting event creation with data:", eventData);

    const response = await fetch(`${API_URL}/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      let errorMessage = "Error creating event.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (err) {
        console.error("Error parsing response:", err);
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
