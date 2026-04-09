import { SessionClient } from "~/components/session/SessionClient";
import { type SessionTask } from "~/types/session";

const SEED_TASKS: SessionTask[] = [
  { id: "1", title: "Calc 2 Quiz Prep", estimatedMinutes: 25, elapsedSeconds: 1110, status: "completed", order: 1 },
  { id: "2", title: "Chemistry homework + notes", estimatedMinutes: 25, elapsedSeconds: 240, status: "completed", order: 2 },
  { id: "3", title: "Trip planning: itinerary + shopping list", estimatedMinutes: 20, elapsedSeconds: 0, status: "skipped", order: 3 },
  { id: "4", title: "ENC paper draft", estimatedMinutes: 25, elapsedSeconds: 242, status: "active", order: 4 },
];

const PARTNER_CURRENT_TASK = { title: "Anatomy homework & flashcards", elapsedSeconds: 920 };

export default function PartnerSessionActivePage() {
  return (
    <SessionClient
      initialTasks={SEED_TASKS}
      partnerCurrentTask={PARTNER_CURRENT_TASK}
      partnerName="Zack J."
      partnerUniversity="University of Florida"
    />
  );
}
