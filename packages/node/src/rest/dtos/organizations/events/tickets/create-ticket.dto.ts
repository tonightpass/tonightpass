import {
  Currency,
  EventTicketCategory,
  EventTicketType,
} from "../../../../types";

export type CreateTicketDto = {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  type: EventTicketType;
  category: EventTicketCategory;
  currency: Currency;
  vatRate: number;
  isVisible: boolean;
  isFeesIncluded: boolean;
  startAt: Date;
  endAt: Date;
};
