import { Document, Model } from "mongoose";

export interface ITicket {
  title: string;
  price: number;
}

export interface ITicketDoc extends ITicket, Document {
  isReserved: () => Promise<boolean>;
  version: number;
}

export interface ITicketModel extends Model<ITicketDoc> {
  findByEvent: (event: {
    id: string;
    version: number;
  }) => Promise<ITicketDoc | null>;
}
