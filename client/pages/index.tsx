import Link from "next/link";
import React from "react";

type Props = {
  currentUser: CurrentUser | null;
};

type CurrentUser = {
  id: string;
  email: string;
};

const IndexPage = ({ currentUser, tickets }: Props) => {
  const ticketList = tickets.map((ticket: any) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href={`/tickets/${ticket.id}`}>
            <a className="nav-link">View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

IndexPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");
  return { tickets: data };
};

export default IndexPage;
