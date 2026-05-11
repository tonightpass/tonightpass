// Refer to the Business Model document for more information.

import {
  Currency,
  MINIMUM_CHARGE_AMOUNTS,
  ZERO_DECIMAL_CURRENCIES,
} from "../rest/types/currencies";

/**
 * Check if a currency is zero-decimal (no minor units).
 * For zero-decimal currencies, amounts are in the major unit (e.g., 500 JPY = 500 yen).
 */
export function isZeroDecimalCurrency(currency: Currency): boolean {
  return ZERO_DECIMAL_CURRENCIES.includes(currency);
}

/**
 * Convert a human-readable price to the smallest currency unit for Stripe.
 * For EUR/USD: 15.00 → 1500 (cents)
 * For JPY: 500 → 500 (yen, already smallest unit)
 */
export function toSmallestUnit(amount: number, currency: Currency): number {
  if (isZeroDecimalCurrency(currency)) {
    return Math.round(amount);
  }
  return Math.round(amount * 100);
}

/**
 * Convert from smallest currency unit to human-readable price.
 * For EUR/USD: 1500 → 15.00
 * For JPY: 500 → 500
 */
export function fromSmallestUnit(amount: number, currency: Currency): number {
  if (isZeroDecimalCurrency(currency)) {
    return amount;
  }
  return amount / 100;
}

export type StripeFees = {
  transactionFee: number; // in cents
  europeRate: number; // percentage
  nonEuropeRate: number; // percentage
  connectRate: number; // percentage
};

export type TonightPassFees = {
  percentage: number; // percentage
  minimumCommission: number; // in smallest currency unit
};

export enum BillingLocality {
  Europe = "Europe",
  NonEurope = "Non Europe",
}

export type BillingParameters = {
  locality: BillingLocality;
};

/**
 * Minimum commission TonightPass charges per ticket (in EUR cents).
 */
export const MINIMUM_COMMISSION = 95;

/**
 * Default minimum chargeable amount (in smallest currency unit).
 * Used as fallback when the currency has no specific Stripe minimum.
 */
export const MINIMUM_CHARGEABLE_AMOUNT = MINIMUM_COMMISSION;

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
 * Get the minimum chargeable amount for a currency (in smallest unit).
 * Falls back to the Stripe minimum for the currency, or MINIMUM_COMMISSION.
 */
export function getMinimumChargeableAmount(currency: Currency): number {
  const stripeMinimum = MINIMUM_CHARGE_AMOUNTS[currency];
  if (stripeMinimum) {
    return Math.max(stripeMinimum, MINIMUM_COMMISSION);
  }
  return MINIMUM_COMMISSION;
}

/**
 * Calculate the platform fee for a ticket (in smallest currency unit).
 * @param ticketPrice - Ticket price in smallest unit (cents, yen, etc.)
 * @param isFeesIncluded - Whether fees are included in the ticket price
 * @param stripeFees - Stripe fee configuration
 * @param tonightPassFees - TonightPass fee configuration
 * @param params - Billing parameters (locality)
 * @returns Fee amount in smallest currency unit
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

  const minimumCommission = tonightPassFees.minimumCommission;

  if (isFeesIncluded) {
    return Math.max(
      totalStripeFee + (totalStripeFee * tonightPassFees.percentage) / 100,
      minimumCommission
    );
  }

  return Math.max(
    totalStripeFee / (1 - tonightPassFees.percentage / 100),
    minimumCommission
  );
}

/**
 * Calculate the platform fee for a ticket with currency-aware minimum commission.
 * Wraps `calculateTicketFee` with a converted minimum commission.
 *
 * @param ticketPrice - Ticket price in smallest unit (cents, yen, etc.)
 * @param isFeesIncluded - Whether fees are included in the ticket price
 * @param convertedMinimumCommission - MINIMUM_COMMISSION converted to the event's currency
 * @param stripeFees - Stripe fee configuration
 * @param params - Billing parameters (locality)
 * @returns Fee amount in smallest currency unit
 */
export function calculateTicketFeeWithCurrency(
  ticketPrice: number,
  isFeesIncluded: boolean,
  convertedMinimumCommission: number,
  stripeFees: StripeFees = DEFAULT_STRIPE_FEES,
  params: BillingParameters = DEFAULT_BILLING_PARAMETERS
): number {
  return calculateTicketFee(
    ticketPrice,
    isFeesIncluded,
    stripeFees,
    {
      ...DEFAULT_TONIGHTPASS_FEES,
      minimumCommission: convertedMinimumCommission,
    },
    params
  );
}

/**
 * Applies the minimum chargeable amount rule after a discount.
 * - If total is 0 → stays 0 (free order)
 * - If total > 0 but below the minimum → rounds up to minimum
 * - Otherwise → unchanged
 *
 * @param total - Order total in smallest currency unit
 * @param minimumAmount - Minimum chargeable amount in the same currency unit
 *   (use getMinimumChargeableAmount or convert MINIMUM_COMMISSION via exchange rates)
 */
export function applyMinimumChargeableAmount(
  total: number,
  minimumAmount: number = MINIMUM_COMMISSION
): number {
  if (total <= 0) {
    return total;
  }
  if (total < minimumAmount) {
    return minimumAmount;
  }
  return total;
}
