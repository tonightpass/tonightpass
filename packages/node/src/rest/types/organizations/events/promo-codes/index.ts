import type {
  CreateOrganizationEventPromoCodeDto,
  UpdateOrganizationEventPromoCodeDto,
} from "../../../../dtos";
import type { Endpoint } from "../../../../endpoints";
import type { ArrayOptions, ArrayResult, Base } from "../../..";

export type OrganizationEventPromoCode = Base & {
  code: string;
  type: OrganizationEventPromoCodeType;
  value: number;
  maxUses?: number;
  usedCount: number;
  isActive: boolean;
  minCartAmount?: number;
  expiresAt?: Date;
  ticketIds?: string[];
};

export enum OrganizationEventPromoCodeType {
  Percentage = "percentage",
  Fixed = "fixed",
}

export type OrganizationEventPromoCodeValidation = {
  valid: boolean;
  promoCode?: OrganizationEventPromoCode;
  message?: string;
};

export type OrganizationEventPromoCodeEndpoints =
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/events/:eventSlug/promo-codes",
      ArrayResult<OrganizationEventPromoCode>,
      ArrayOptions<OrganizationEventPromoCode>
    >
  | Endpoint<
      "POST",
      "/organizations/@:organizationSlug/events/:eventSlug/promo-codes",
      OrganizationEventPromoCode,
      CreateOrganizationEventPromoCodeDto
    >
  | Endpoint<
      "PUT",
      "/organizations/@:organizationSlug/events/:eventSlug/promo-codes/:promoCodeId",
      OrganizationEventPromoCode,
      UpdateOrganizationEventPromoCodeDto
    >
  | Endpoint<
      "DELETE",
      "/organizations/@:organizationSlug/events/:eventSlug/promo-codes/:promoCodeId",
      OrganizationEventPromoCode,
      null
    >
  | Endpoint<
      "POST",
      "/organizations/@:organizationSlug/events/:eventSlug/promo-codes/validate",
      OrganizationEventPromoCodeValidation,
      { code: string }
    >;
