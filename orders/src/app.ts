import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUser, errorHandler, NotFoundError } from "@mrbtickets/common";
import cookieSession from "cookie-session";

import { showOrderRouter } from "./routes/show";
import { listOrderRouter } from "./routes/list";
import { newOrderRouter } from "./routes/new";
import { deleteOrderRouter } from "./routes/delete";


const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test" ? true : false,
  })
);

app.use(currentUser);

app.use(showOrderRouter);
app.use(listOrderRouter);
app.use(newOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
