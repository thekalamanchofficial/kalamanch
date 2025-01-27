import { EventSchemas, Inngest } from "inngest";
import type { Events } from "./types";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "kalamanch",
  schemas: new EventSchemas().fromRecord<Events>(),
});
