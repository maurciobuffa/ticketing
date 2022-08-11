import { Schema, model } from "mongoose";
import { ITicketDoc, ITicketModel } from '../interfaces/tickets';
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

const ticketSchema = new Schema<ITicketDoc>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    }
  },
  {
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
  
        return ret;
      }
    }
  }
);

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

const Ticket = model<ITicketDoc, ITicketModel>("Ticket", ticketSchema);

export { Ticket };
