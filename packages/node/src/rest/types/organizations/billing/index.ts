export enum StripeAccountStatus {
  PENDING = "pending",
  RESTRICTED = "restricted",
  ENABLED = "enabled",
  DISABLED = "disabled",
}

export enum PayoutSchedule {
  MANUAL = "manual",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

export type OrganizationBilling = {
  accountId: string;
  status: StripeAccountStatus;
  detailsSubmitted: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  payoutSchedule: PayoutSchedule;
  requirements?: {
    currently_due: string[];
    eventually_due: string[];
    past_due: string[];
    pending_verification: string[];
  };
  businessProfile?: {
    mcc?: string;
    name?: string;
    product_description?: string;
    support_address?: object;
    support_email?: string;
    support_phone?: string;
    support_url?: string;
    url?: string;
  };
  totalVolume: number;
  totalFees: number;
  lastPayoutDate?: Date;
  connectedAccountFeatures: string[];
  dashboardSettings?: {
    displayName?: string;
    timezone?: string;
  }
}