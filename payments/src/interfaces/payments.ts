import { Document, Model } from "mongoose";

export interface IPayment {
  orderId: string;
  stripeId: string;
}

export interface IPaymentDoc extends IPayment, Document {
  orderId: string;
  stripeId: string;
}

export interface IPaymentModel extends Model<IPaymentDoc> {}
