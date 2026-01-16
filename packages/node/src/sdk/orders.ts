import type { ArrayOptions, Order } from "../rest";
import { sdk } from "./builder";

export const orders = sdk((client) => ({
  getAll: async (options?: ArrayOptions<Order>) => {
    return client.get("/orders", options);
  },
  get: async (orderId: string) => {
    return client.get("/orders/:orderId", {
      orderId,
    });
  },
}));
