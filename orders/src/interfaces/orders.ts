import { OrderStatus } from "@mrbtickets/common";
import { Document, Model } from "mongoose";
import { ITicket } from "./tickets";

interface OrderTicket extends ITicket {
  id: string;
}

export interface IOrder {
  userId: string;
  status: OrderStatus;
  expiresAt?: Date;
  ticket?: OrderTicket;
  version: number;
}

export interface IOrderDoc extends IOrder, Document {}

export interface IOrderModel extends Model<IOrderDoc> {}
