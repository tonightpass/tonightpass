// Refer to the Business Model document for more information.

export type StripeFees = {
  transactionFee: number; // in cents
  europeRate: number; // percentage
  nonEuropeRate: number; // percentage
  connectRate: number; // percentage
};

export type TonightPassFees = {
  percentage: number; // percentage
  minimumCommission: number; // in euros
};

export enum BillingLocality {
  Europe = "Europe",
  NonEurope = "Non Europe",
}

export type BillingParameters = {
  locality: BillingLocality;
};

/**
 * Minimum commission TonightPass charges per ticket (in euros).
 */
export const MINIMUM_COMMISSION = 0.95;

/**
 * Minimum amount (in cents) that can be charged via Stripe.
 * Below this threshold, the order total is rounded up to this value
 * so the platform fee is always covered.
 * Derived from MINIMUM_COMMISSION.
 */
export const MINIMUM_CHARGEABLE_AMOUNT = MINIMUM_COMMISSION * 100;

export const DEFAULT_STRIPE_FEES: StripeFees = {
  transactionFee: 25,
  europeRate: 1.5,
  nonEuropeRate: 3.25,
  connectRate: 0.25,
};

export const DEFAULT_TONIGHTPASS_FEES: TonightPassFees = {
  percentage: 50.0,
  minimumCommission: MINIMUM_COMMISSION,
};

export const DEFAULT_BILLING_PARAMETERS: BillingParameters = {
  locality: BillingLocality.Europe,
};

/**
 * Calculate the platform fee for a ticket (in cents).
 * @param ticketPrice - Ticket price in cents
 * @param isFeesIncluded - Whether fees are included in the ticket price
 * @param stripeFees - Stripe fee configuration
 * @param tonightPassFees - TonightPass fee configuration
 * @param params - Billing parameters (locality)
 * @returns Fee amount in cents
 */
export function calculateTicketFee(
  ticketPrice: number,
  isFeesIncluded: boolean,
  stripeFees: StripeFees = DEFAULT_STRIPE_FEES,
  tonightPassFees: TonightPassFees = DEFAULT_TONIGHTPASS_FEES,
  params: BillingParameters = DEFAULT_BILLING_PARAMETERS
): number {
  if (ticketPrice <= 0) {
    return 0;
  }

  const localityRate =
    params.locality === "Europe"
      ? stripeFees.europeRate
      : stripeFees.nonEuropeRate;
  const localityFee = (localityRate * ticketPrice) / 100;
  const connectFee = (stripeFees.connectRate * ticketPrice) / 100;
  const totalStripeFee = stripeFees.transactionFee + localityFee + connectFee;

  const minimumCommissionCents = tonightPassFees.minimumCommission * 100;

  if (isFeesIncluded) {
    return Math.max(
      totalStripeFee + (totalStripeFee * tonightPassFees.percentage) / 100,
      minimumCommissionCents
    );
  }

  return Math.max(
    totalStripeFee / (1 - tonightPassFees.percentage / 100),
    minimumCommissionCents
  );
}

/**
 * Applies the minimum chargeable amount rule after a discount.
 * - If total is 0 → stays 0 (free order)
 * - If total is between 1 and MINIMUM_CHARGEABLE_AMOUNT-1 → rounds up to MINIMUM_CHARGEABLE_AMOUNT
 * - Otherwise → unchanged
 */
export function applyMinimumChargeableAmount(total: number): number {
  if (total > 0 && total < MINIMUM_CHARGEABLE_AMOUNT) {
    return MINIMUM_CHARGEABLE_AMOUNT;
  }
  return total;
}
