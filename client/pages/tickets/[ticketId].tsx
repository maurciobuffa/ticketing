import { useRouter } from "next/router";
import { useRequest } from "../../hooks/useRequest";

const TicketPage = ({ ticket }) => {
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => router.push("/orders/" + order.id),
  });
  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors.length ? (
        <div className="alert alert-danger">
          <h4>Oooops...</h4>
          <ul className="my-0">
            {errors.map((err, index) => (
              <li key={index}>{err?.message}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <button onClick={() => doRequest()} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

TicketPage.getInitialProps = async (context, client, currentUser) => {
  const { ticketId } = context.query;
  const { data } = await client.get("/api/tickets/" + ticketId);
  return { ticket: data };
};

export default TicketPage;
