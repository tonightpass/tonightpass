import { sdk } from "./builder";
import { ArrayOptions, Order } from "../rest";

export const orders = sdk((client) => ({
  getAll: async (options?: ArrayOptions<Order>) => {
    return client.get("/orders", options);
  },
  get: async (invoiceId: string) => {
    return client.get("/orders/:invoiceId", {
      invoiceId,
    });
  },
}));
