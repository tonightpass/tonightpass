import { sdk } from "../../builder";
import { usersBookingsTickets } from "./tickets";

export const usersBookings = sdk((client) => ({
  getAll: async () => client.get("/users/bookings"),
  get: async (bookingId: string) =>
    client.get("/users/bookings/:bookingId", { bookingId }),
  me: async () => client.get("/users/~me/bookings"),
  tickets: usersBookingsTickets(client),
}));
