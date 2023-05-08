import { Basket } from "./basket";

export type User = {
  email: string;
  token: string;
  basket?: Basket;
};