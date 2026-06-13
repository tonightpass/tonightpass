import { billingTests } from "./billing";
import { currenciesTests } from "./currencies";
import { organizationsTests } from "./organizations";

export function unitTests() {
  billingTests();
  currenciesTests();
  organizationsTests();
}
