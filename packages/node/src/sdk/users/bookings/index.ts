import { sdk } from "../../builder";

export const usersBookings = sdk((client) => ({
  getAll: async () => client.get("/users/bookings"),
  get: async (bookingId: string) =>
    client.get("/users/bookings/:bookingId", { bookingId }),
}));
