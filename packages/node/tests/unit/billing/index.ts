import { feesTests } from "./fees";
import { promoCodeTests } from "./promo-codes";

export function billingTests() {
  feesTests();
  promoCodeTests();
}
