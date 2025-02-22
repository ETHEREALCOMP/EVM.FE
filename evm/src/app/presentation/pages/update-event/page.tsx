import UpdateEventForm from "@/app/presentation/components/UpdateEvent";
import { useRouter } from "next/router";
import { updateEvent } from "@/app/shared/api/events";

const UpdateEventPage = ({ params }: { params: { eventId: string } }) => {
  const { eventId } = params;
  const router = useRouter();

  const initialData = {
    title: "Event Title",
    description: "Event Description",
    location: "Event Location",
    isTicket: true,
    ticketRequest: {
      price: 20,
      location: "Event Ticket Location",
      type: 1,
    },
  };

  const handleSave = async (eventData: any) => {
    try {
      await updateEvent(eventId, eventData);
      router.push("/presentation/pages/events");
    } catch (err) {
      console.error("Failed to update event", err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <UpdateEventForm initialData={initialData} onSave={handleSave} />
    </div>
  );
};

export default UpdateEventPage;