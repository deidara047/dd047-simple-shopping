import { type Document } from "mongoose";

export interface DBC_Product extends Document {
  name: String,
  price: Number,
  imageRoute: String
}

export interface DBC_History extends Document {
  owner_id: String, // The id of the owner
  createdAt: Date,
  itemsPurchased: Array<DBC_Product>,
  total: Number
}
