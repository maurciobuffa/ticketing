import { Publisher, OrderCancelledEvent, Subjects } from "@mrbtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
