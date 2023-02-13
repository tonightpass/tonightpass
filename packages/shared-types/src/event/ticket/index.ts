export type EventTicket = {
  id: string;
  title: string;
  unitPrice: number;
  feesIncluded: boolean;
  quantity: number;
  startAt: Date;
  endAt: Date;
  updatedAt: Date;
  createdAt: Date;
};
