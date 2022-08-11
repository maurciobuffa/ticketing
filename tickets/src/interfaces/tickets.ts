import { Document, Model } from "mongoose";

export interface ITickets {
  title: string;
  price: number;
  userId: string;
};

export interface ITicketDoc extends ITickets, Document {
  version: number;
  orderId?: string;
}

export interface ITicketModel extends Model<ITicketDoc> {}
