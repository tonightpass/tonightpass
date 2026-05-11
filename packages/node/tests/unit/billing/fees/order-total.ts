import assert from "node:assert/strict";
import test from "node:test";

import { calculateOrderTotal, MINIMUM_COMMISSION } from "../../../../src";

export function orderTotalTests() {
  test("calculateOrderTotal - empty cart", () => {
    const result = calculateOrderTotal([]);
    assert.strictEqual(result.subtotal, 0);
    assert.strictEqual(result.fees, 0);
    assert.strictEqual(result.includedFees, 0);
    assert.strictEqual(result.total, 0);
  });

  test("calculateOrderTotal - single ticket, fees excluded", () => {
    const result = calculateOrderTotal([
      { unitAmount: 1000, isFeesIncluded: false, quantity: 1 },
    ]);
    assert.strictEqual(result.subtotal, 1000);
    assert.ok(result.fees >= MINIMUM_COMMISSION, "Fee should be >= minimum");
    assert.strictEqual(result.includedFees, 0);
    assert.strictEqual(
      result.total,
      result.subtotal + result.fees,
      "Total = subtotal + fees when excluded"
    );
  });

  test("calculateOrderTotal - single ticket, fees included", () => {
    const result = calculateOrderTotal([
      { unitAmount: 1000, isFeesIncluded: true, quantity: 1 },
    ]);
    assert.strictEqual(result.subtotal, 1000);
    assert.ok(result.fees >= MINIMUM_COMMISSION, "Fee should be >= minimum");
    assert.strictEqual(result.includedFees, result.fees);
    assert.strictEqual(
      result.total,
      result.subtotal,
      "Total = subtotal when fees included and price > fee"
    );
  });

  test("calculateOrderTotal - fees included, price < minimum commission", () => {
    // Ticket at 50 cents with fees included, fee = 95 cents (minimum)
    const result = calculateOrderTotal([
      { unitAmount: 50, isFeesIncluded: true, quantity: 1 },
    ]);
    assert.strictEqual(result.subtotal, 50);
    assert.strictEqual(result.fees, MINIMUM_COMMISSION);
    // includedFees capped at subtotal (50), not full fee (95)
    assert.strictEqual(
      result.includedFees,
      50,
      "Included fees capped at subtotal"
    );
    // total = 50 + 95 - 50 = 95 (buyer pays the minimum)
    assert.strictEqual(
      result.total,
      MINIMUM_COMMISSION,
      "Buyer pays minimum commission when price < fee"
    );
  });

  test("calculateOrderTotal - free ticket", () => {
    const result = calculateOrderTotal([
      { unitAmount: 0, isFeesIncluded: true, quantity: 1 },
    ]);
    assert.strictEqual(result.subtotal, 0);
    assert.strictEqual(result.fees, 0);
    assert.strictEqual(result.total, 0);
  });

  test("calculateOrderTotal - multiple tickets, quantity > 1", () => {
    const result = calculateOrderTotal([
      { unitAmount: 1000, isFeesIncluded: false, quantity: 3 },
    ]);
    assert.strictEqual(result.subtotal, 3000);
    // Fee per ticket * 3
    const singleFee = calculateOrderTotal([
      { unitAmount: 1000, isFeesIncluded: false, quantity: 1 },
    ]).fees;
    assert.strictEqual(result.fees, singleFee * 3);
    assert.strictEqual(result.total, 3000 + result.fees);
  });

  test("calculateOrderTotal - mixed tickets (included + excluded)", () => {
    const result = calculateOrderTotal([
      { unitAmount: 1000, isFeesIncluded: true, quantity: 1 },
      { unitAmount: 500, isFeesIncluded: false, quantity: 1 },
    ]);
    assert.strictEqual(result.subtotal, 1500);
    assert.ok(result.fees > 0);
    assert.ok(
      result.includedFees > 0 && result.includedFees < result.fees,
      "Only the included ticket fee should count"
    );
    // total = subtotal + fees - includedFees
    assert.strictEqual(
      result.total,
      result.subtotal + result.fees - result.includedFees
    );
  });

  test("calculateOrderTotal - with converted minimum (USD)", () => {
    const usdMinimum = Math.round(MINIMUM_COMMISSION * 1.09); // ~104
    const result = calculateOrderTotal(
      [{ unitAmount: 100, isFeesIncluded: false, quantity: 1 }],
      usdMinimum
    );
    assert.strictEqual(result.fees, usdMinimum, "Should use converted minimum");
    assert.strictEqual(result.total, 100 + usdMinimum);
  });

  test("calculateOrderTotal - EUR matches default minimum", () => {
    const resultDefault = calculateOrderTotal([
      { unitAmount: 100, isFeesIncluded: false, quantity: 1 },
    ]);
    const resultEur = calculateOrderTotal(
      [{ unitAmount: 100, isFeesIncluded: false, quantity: 1 }],
      MINIMUM_COMMISSION
    );
    assert.strictEqual(
      resultDefault.total,
      resultEur.total,
      "Default should match EUR"
    );
  });
}
