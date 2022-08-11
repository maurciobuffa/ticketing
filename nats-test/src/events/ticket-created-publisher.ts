import { Publisher } from "./base-publiser";
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from "./subjects";

export class TickedCreatedPublished extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
