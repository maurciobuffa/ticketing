import { Publisher, OrderCreatedEvent, Subjects  } from "@mrbtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}