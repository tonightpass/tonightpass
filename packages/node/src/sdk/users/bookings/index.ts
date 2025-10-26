import { sdk } from "../../builder";

export const usersBookings = sdk((client) => ({
  getAll: async () => client.get("/users/bookings"),
  get: async (bookingId: string) =>
    client.get("/users/bookings/:bookingId", { bookingId }),
  me: async () => client.get("/users/@me/bookings"),
  tickets: {
    use: async (ticketId: string, tokenId: string, tokenValue: string) =>
      client.put(
        "/users/bookings/tickets/:ticketId/use",
        {
          tokenId,
          tokenValue,
        },
        { ticketId },
      ),
  },
}));
