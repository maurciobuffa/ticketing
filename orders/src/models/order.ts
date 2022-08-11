import mongoose, { Schema, model, Model } from "mongoose";
import { IOrderDoc , IOrderModel} from "../interfaces/orders";
import { OrderStatus } from "@mrbtickets/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export { OrderStatus };

const OrderSchema = new Schema<IOrderDoc>(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;

        return ret;
      },
    },
  }
);

OrderSchema.set("versionKey", "version");
OrderSchema.plugin(updateIfCurrentPlugin);

const Order = model<IOrderDoc, IOrderModel>("Order", OrderSchema);

export { Order };
