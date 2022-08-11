import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRequest } from "../../hooks/useRequest";

const signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "POST",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign in</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

      <button className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default signin;
