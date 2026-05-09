import { billingTests } from "./billing";
import { currenciesTests } from "./currencies";

export function unitTests() {
  billingTests();
  currenciesTests();
}
