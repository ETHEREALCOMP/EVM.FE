export interface createEvent {
    title: string;
    description: string;
    location: string;
}

export type EventType = {
    id: string;
    name: string;
    description: string;
    location: string;
};

export interface CreateEventRequest {
    title: string;
    description: string;
    location: string;
    isTicket: boolean;
    ticketRequest?: {
      price: number;
      location: string;
      type: number;
    };
}

export interface UpdateEventRequest {
    title?: string;
    description?: string;
    location?: string;
    isTicket?: boolean;
    ticketRequest?: {
      price: number;
      location: string;
      type: number;
    };
}
  