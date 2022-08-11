import { Subjects, TicketCreatedEvent } from "@mrbtickets/common";
import { TicketCreatedListener } from "../ticket-created-listener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";

const setup = async () => {
  const listener = new TicketCreatedListener(natsWrapper.client);

  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: "concert",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  const message: Pick<Message, "ack"> = {
    ack: jest.fn(),
  };

  return { listener, data, message };
};

it("creates and saved a ticket", async () => {
  const { listener, data, message } = await setup();

  // call the onMessage function with the data object + message object
  // @ts-ignore
  await listener.onMessage(data, message);

  // write assertions to make sure that a ticket was created
  const ticket = await Ticket.findById(data.id);
  expect(ticket?.price).toEqual(data.price);
  expect(ticket?.title).toEqual(data.title);
});

it("acks the message", async () => {
  const { listener, data, message } = await setup();

  // call the onMessage function with the data object + message object
  // @ts-ignore
  await listener.onMessage(data, message);

  // write assertions to make sure that the ack function is called
  expect(message.ack).toHaveBeenCalled();
});
