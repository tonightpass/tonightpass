import { sdk } from "../../../builder";

export const usersBookingsTickets = sdk((client) => ({
  get: async (ticketId: string) =>
    client.get("/users/bookings/tickets/:ticketId", { ticketId }),
  use: async (ticketId: string, tokenId: string, tokenValue: string) =>
    client.put(
      "/users/bookings/tickets/:ticketId/use",
      {
        tokenId,
        tokenValue,
      },
      { ticketId }
    ),
}));
