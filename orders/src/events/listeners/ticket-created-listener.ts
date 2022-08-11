import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@mrbtickets/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(
    data: TicketCreatedEvent["data"],
    msg: Message
  ) {
    try {
      const { title, price, id } = data;
      const ticket = new Ticket({
        title: data.title,
        price: data.price,
        id: data.id,
        _id: data.id,
      });
      await ticket.save();
  
      msg.ack();
    } catch (error) {
      console.error(error)
    }
  }
}
