import assert from "node:assert/strict";
import test from "node:test";

import {
  BillingLocality,
  calculateTicketFee,
  DEFAULT_STRIPE_FEES,
  DEFAULT_TONIGHTPASS_FEES,
} from "../../../src";

export function billingFeesTests() {
  test("calculateTicketFee - should calculate correct fee for europe transaction with fees included", () => {
    const ticketPrice = 1000;
    const fee = calculateTicketFee(ticketPrice, true);
    assert.ok(Math.abs(fee - 95) < 0.0001, `Expected ~95, got ${fee}`);
  });

  test("calculateTicketFee - should calculate correct fee for non europe transaction with fees included", () => {
    const ticketPrice = 1000;
    const fee = calculateTicketFee(
      ticketPrice,
      true,
      DEFAULT_STRIPE_FEES,
      DEFAULT_TONIGHTPASS_FEES,
      { locality: BillingLocality.NonEurope }
    );
    assert.ok(Math.abs(fee - 95) < 0.0001, `Expected ~95, got ${fee}`);
  });

  test("calculateTicketFee - should apply minimum commission when calculated fee is lower with fees included", () => {
    const fee = calculateTicketFee(100, true);
    assert.strictEqual(fee, 95);
  });

  test("calculateTicketFee - should handle zero ticket price", () => {
    assert.strictEqual(calculateTicketFee(0, true), 0);
  });

  test("calculateTicketFee - should calculate correct fee for national transaction with fees not included", () => {
    assert.strictEqual(calculateTicketFee(1000, false), 95);
  });

  test("calculateTicketFee - should calculate correct fee for international transaction with fees not included", () => {
    const fee = calculateTicketFee(
      1000,
      false,
      DEFAULT_STRIPE_FEES,
      DEFAULT_TONIGHTPASS_FEES,
      { locality: BillingLocality.NonEurope }
    );
    assert.strictEqual(fee, 120);
  });

  test("calculateTicketFee - should apply minimum commission when calculated fee is lower with fees not included", () => {
    assert.strictEqual(calculateTicketFee(100, false), 95);
  });

  test("calculateTicketFee - should use custom Stripe fees", () => {
    const fee = calculateTicketFee(1000, true, {
      transactionFee: 50,
      europeRate: 3.0,
      nonEuropeRate: 5.0,
      connectRate: 0.5,
    });
    assert.strictEqual(fee, 127.5);
  });

  test("calculateTicketFee - should use custom TonightPass fees", () => {
    const fee = calculateTicketFee(1000, true, DEFAULT_STRIPE_FEES, {
      percentage: 30.0,
      minimumCommission: 2.0,
    });
    assert.strictEqual(fee, 200);
  });

  test("calculateTicketFee - should handle negative ticket price", () => {
    assert.strictEqual(calculateTicketFee(-100, true), 0);
  });

  test("calculateTicketFee - should handle very large ticket price", () => {
    assert.strictEqual(calculateTicketFee(1_000_000, true), 26_287.5);
  });

  test("calculateTicketFee - should handle zero percentage TonightPass fee", () => {
    const fee = calculateTicketFee(1000, true, DEFAULT_STRIPE_FEES, {
      percentage: 0,
      minimumCommission: 0.95,
    });
    assert.strictEqual(fee, 95);
  });

  test("calculateTicketFee - should handle 100% TonightPass percentage", () => {
    const fee = calculateTicketFee(1000, true, DEFAULT_STRIPE_FEES, {
      percentage: 100,
      minimumCommission: 0.95,
    });
    assert.strictEqual(fee, 95);
  });

  test("calculateTicketFee - should handle zero minimum commission", () => {
    const fee = calculateTicketFee(100, true, DEFAULT_STRIPE_FEES, {
      percentage: 50,
      minimumCommission: 0,
    });
    assert.ok(Math.abs(fee - 40.125) < 0.0001, `Expected ~40.125, got ${fee}`);
  });
}
