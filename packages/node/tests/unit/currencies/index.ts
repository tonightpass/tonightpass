import assert from "node:assert/strict";
import test from "node:test";

import {
  Currency,
  fromSmallestUnit,
  isZeroDecimalCurrency,
  MINIMUM_CHARGE_AMOUNTS,
  toSmallestUnit,
  ZERO_DECIMAL_CURRENCIES,
} from "../../../src";

export function currenciesTests() {
  test("ZERO_DECIMAL_CURRENCIES - should contain known zero-decimal currencies", () => {
    assert.ok(ZERO_DECIMAL_CURRENCIES.includes(Currency.JPY));
    assert.ok(ZERO_DECIMAL_CURRENCIES.includes(Currency.KRW));
    assert.ok(ZERO_DECIMAL_CURRENCIES.includes(Currency.VND));
    assert.ok(ZERO_DECIMAL_CURRENCIES.includes(Currency.XAF));
    assert.ok(ZERO_DECIMAL_CURRENCIES.includes(Currency.XOF));
  });

  test("ZERO_DECIMAL_CURRENCIES - EUR, USD, GBP should NOT be zero-decimal", () => {
    assert.ok(!ZERO_DECIMAL_CURRENCIES.includes(Currency.EUR));
    assert.ok(!ZERO_DECIMAL_CURRENCIES.includes(Currency.USD));
    assert.ok(!ZERO_DECIMAL_CURRENCIES.includes(Currency.GBP));
  });

  test("isZeroDecimalCurrency - should return true for JPY", () => {
    assert.strictEqual(isZeroDecimalCurrency(Currency.JPY), true);
  });

  test("isZeroDecimalCurrency - should return false for EUR", () => {
    assert.strictEqual(isZeroDecimalCurrency(Currency.EUR), false);
  });

  test("toSmallestUnit - EUR: 15.00 → 1500", () => {
    assert.strictEqual(toSmallestUnit(15, Currency.EUR), 1500);
  });

  test("toSmallestUnit - USD: 9.99 → 999", () => {
    assert.strictEqual(toSmallestUnit(9.99, Currency.USD), 999);
  });

  test("toSmallestUnit - JPY: 500 → 500 (no multiplication)", () => {
    assert.strictEqual(toSmallestUnit(500, Currency.JPY), 500);
  });

  test("toSmallestUnit - KRW: 10000 → 10000 (no multiplication)", () => {
    assert.strictEqual(toSmallestUnit(10_000, Currency.KRW), 10_000);
  });

  test("toSmallestUnit - XAF: 1000 → 1000 (no multiplication)", () => {
    assert.strictEqual(toSmallestUnit(1000, Currency.XAF), 1000);
  });

  test("fromSmallestUnit - EUR: 1500 → 15.00", () => {
    assert.strictEqual(fromSmallestUnit(1500, Currency.EUR), 15);
  });

  test("fromSmallestUnit - JPY: 500 → 500 (no division)", () => {
    assert.strictEqual(fromSmallestUnit(500, Currency.JPY), 500);
  });

  test("fromSmallestUnit - USD: 999 → 9.99", () => {
    assert.strictEqual(fromSmallestUnit(999, Currency.USD), 9.99);
  });

  test("toSmallestUnit/fromSmallestUnit - roundtrip for all currencies", () => {
    const testAmount = 42.5;
    for (const currency of Object.values(Currency)) {
      const smallest = toSmallestUnit(testAmount, currency);
      const back = fromSmallestUnit(smallest, currency);

      if (isZeroDecimalCurrency(currency)) {
        // Zero-decimal: 42.5 → 43 (rounded) → 43
        assert.strictEqual(smallest, 43, `${currency}: toSmallestUnit`);
        assert.strictEqual(back, 43, `${currency}: fromSmallestUnit`);
      } else {
        // Regular: 42.5 → 4250 → 42.5
        assert.strictEqual(smallest, 4250, `${currency}: toSmallestUnit`);
        assert.strictEqual(back, 42.5, `${currency}: fromSmallestUnit`);
      }
    }
  });

  test("MINIMUM_CHARGE_AMOUNTS - should have amounts for major currencies", () => {
    assert.ok(MINIMUM_CHARGE_AMOUNTS[Currency.EUR]! > 0);
    assert.ok(MINIMUM_CHARGE_AMOUNTS[Currency.USD]! > 0);
    assert.ok(MINIMUM_CHARGE_AMOUNTS[Currency.GBP]! > 0);
  });

  test("MINIMUM_CHARGE_AMOUNTS - JPY minimum should be reasonable", () => {
    // Stripe minimum for JPY is 50 yen (~0.30€), not 50 cents
    assert.strictEqual(MINIMUM_CHARGE_AMOUNTS[Currency.JPY], 50);
  });
}
