import { type Document } from "mongoose";

export interface DBC_Product extends Document {
  name: String,
  price: Number,
  stock: Number,
  imageRoute: String
}
