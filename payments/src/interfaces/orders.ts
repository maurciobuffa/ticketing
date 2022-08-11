import { OrderStatus } from "@mrbtickets/common";
import { Document, Model } from "mongoose";

export interface IOrder {
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
}

export interface IOrderDoc extends IOrder, Document {}

export interface IOrderModel extends Model<IOrderDoc> {}
