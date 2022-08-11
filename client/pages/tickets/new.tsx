import Router from "next/router";
import React, { useState } from "react";
import { useRequest } from "../../hooks/useRequest";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string | number>("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => {
      Router.push("/");
    },
  });

  const onBlue = (e: { target: { value: string } }) => {
    const value = parseFloat(e.target.value);

    if (isNaN(value)) {
      setPrice(0);
      return;
    }

    setPrice(value.toFixed(2));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
            id="title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            value={price}
            onBlur={onBlue}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="form-control"
            id="price"
          />
        </div>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTicket;
