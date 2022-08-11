import { PaymentCreatedEvent, Publisher, Subjects } from "@mrbtickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}

