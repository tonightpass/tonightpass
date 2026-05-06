import type {
  ArrayOptions,
  Client,
  CreateOrganizationEventPromoCodeDto,
  OrganizationEventPromoCode,
  UpdateOrganizationEventPromoCodeDto,
} from "../../../../rest";

export const organizationsEventsPromoCodes = (client: Client) => ({
  getAll: async (
    organizationSlug: string,
    eventSlug: string,
    options?: ArrayOptions<OrganizationEventPromoCode>
  ) =>
    client.get(
      "/organizations/@:organizationSlug/events/:eventSlug/promo-codes",
      {
        organizationSlug,
        eventSlug,
        ...options,
      }
    ),
  create: async (
    organizationSlug: string,
    eventSlug: string,
    data: CreateOrganizationEventPromoCodeDto
  ) =>
    client.post(
      "/organizations/@:organizationSlug/events/:eventSlug/promo-codes",
      data,
      {
        organizationSlug,
        eventSlug,
      }
    ),
  update: async (
    organizationSlug: string,
    eventSlug: string,
    promoCodeId: string,
    data: UpdateOrganizationEventPromoCodeDto
  ) =>
    client.put(
      "/organizations/@:organizationSlug/events/:eventSlug/promo-codes/:promoCodeId",
      data,
      {
        organizationSlug,
        eventSlug,
        promoCodeId,
      }
    ),
  delete: async (
    organizationSlug: string,
    eventSlug: string,
    promoCodeId: string
  ) =>
    client.delete(
      "/organizations/@:organizationSlug/events/:eventSlug/promo-codes/:promoCodeId",
      undefined,
      {
        organizationSlug,
        eventSlug,
        promoCodeId,
      }
    ),
  validate: async (organizationSlug: string, eventSlug: string, code: string) =>
    client.post(
      "/organizations/@:organizationSlug/events/:eventSlug/promo-codes/validate",
      { code },
      {
        organizationSlug,
        eventSlug,
      }
    ),
});
