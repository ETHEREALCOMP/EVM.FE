export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    type: "online" | "offline";
    participants: string[];
    status: "planned" | "ongoing" | "completed";
  }
  
  export interface CreateEventInput {
    title: string;
    description: string;
    date: string;
    location: string;
    type: "online" | "offline";
  }
  
  export interface UpdateEventInput {
    id: string;
    title?: string;
    description?: string;
    date?: string;
    location?: string;
    type?: "online" | "offline";
  }
  