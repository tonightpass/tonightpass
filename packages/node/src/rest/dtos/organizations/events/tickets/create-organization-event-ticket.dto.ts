import {
  Currency,
  OrganizationEventTicketCategory,
  OrganizationEventTicketType,
} from "../../../../types";

export class CreateOrganizationEventTicketDto {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  type: OrganizationEventTicketType;
  category: OrganizationEventTicketCategory;
  currency: Currency;
  isVisible: boolean;
  isFeesIncluded: boolean;
  startAt: Date;
  endAt: Date;
}
