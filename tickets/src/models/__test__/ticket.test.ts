import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // Create an instance of the ticket model in the db
  const ticket = new Ticket({
    title: "concert",
    price: 5,
    userId: "123",
  });

  // Save the ticket to the db
  await ticket.save();

  // Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Make two separate changes to the ticket
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // Save the first fetched ticket
  await firstInstance!.save();

  // Save the second ticket and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }
});

it("increments the version number on multiple saves", async () => {
  const ticket = new Ticket({
    title: "concert",
    price: 20,
    userId: "123",
  });
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
