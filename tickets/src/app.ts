import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUser, errorHandler, NotFoundError } from "@mrbtickets/common";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { showRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/list";
import { updateTicketRouter } from "./routes/update";

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

app.use(createTicketRouter);
app.use(showRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
