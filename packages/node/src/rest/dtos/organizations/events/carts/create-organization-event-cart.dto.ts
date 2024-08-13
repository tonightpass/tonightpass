export class CreateOrganizationEventCartDto {
  tickets: CreateOrganizationEventCartTicketDto[];
}

export class CreateOrganizationEventCartTicketDto {
  ticketId: string;
  quantity: number;
}
