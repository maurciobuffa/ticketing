import { Schema, model } from "mongoose";
import { IPaymentDoc, IPaymentModel } from "../interfaces/payments";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

const PaymentSchema = new Schema<IPaymentDoc>(
  {
    orderId: {
      type: String,
      required: true,
    },
    stripeId: {
      type: String,
      required: true,
    },
  },
  {
    // versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;

        return ret;
      },
    },
  }
);

PaymentSchema.set("versionKey", "version");
PaymentSchema.plugin(updateIfCurrentPlugin);

const Payment = model<IPaymentDoc, IPaymentModel>("Payment", PaymentSchema);

export { Payment };
