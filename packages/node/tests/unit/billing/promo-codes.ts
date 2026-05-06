import assert from "node:assert/strict";
import test from "node:test";

import { applyMinimumChargeableAmount, calculateTicketFee } from "../../../src";

function buildOrderWithDiscount(params: {
  ticketPrice: number;
  quantity: number;
  isFeesIncluded: boolean;
  discountType: "percentage" | "fixed";
  discountValue: number;
}) {
  const { ticketPrice, quantity, isFeesIncluded, discountType, discountValue } =
    params;

  const subtotal = ticketPrice * quantity;
  const fee = Math.round(calculateTicketFee(ticketPrice, isFeesIncluded));
  const totalFee = fee * quantity;

  let total = 0;
  if (isFeesIncluded) {
    total = subtotal;
  } else {
    total = subtotal + totalFee;
  }

  let discountAmount = 0;
  if (discountType === "percentage") {
    discountAmount = Math.round((subtotal * discountValue) / 100);
  } else {
    discountAmount = Math.min(discountValue, subtotal);
  }

  const finalTotal = applyMinimumChargeableAmount(
    Math.max(0, total - discountAmount)
  );

  let finalFee = totalFee;
  if (finalTotal === 0) {
    finalFee = 0;
  } else if (discountAmount > 0) {
    finalFee = Math.round(totalFee * (finalTotal / total));
  }

  return {
    subtotal,
    totalFee,
    total,
    discountAmount,
    finalTotal,
    finalFee,
    isFree: finalTotal === 0,
  };
}

export function promoCodeTests() {
  test("promo code - 50% off a 15 EUR ticket (fees included)", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 1500,
      quantity: 1,
      isFeesIncluded: true,
      discountType: "percentage",
      discountValue: 50,
    });
    assert.strictEqual(result.discountAmount, 750);
    assert.strictEqual(result.finalTotal, 750);
    assert.ok(!result.isFree);
  });

  test("promo code - 50% off a 15 EUR ticket (fees excluded)", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 1500,
      quantity: 1,
      isFeesIncluded: false,
      discountType: "percentage",
      discountValue: 50,
    });
    assert.strictEqual(result.discountAmount, 750);
    assert.ok(result.finalTotal > 0);
    assert.ok(!result.isFree);
  });

  test("promo code - 100% off makes order free", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 1500,
      quantity: 1,
      isFeesIncluded: true,
      discountType: "percentage",
      discountValue: 100,
    });
    assert.strictEqual(result.finalTotal, 0);
    assert.strictEqual(result.finalFee, 0);
    assert.ok(result.isFree);
  });

  test("promo code - fixed 5 EUR off a 15 EUR ticket", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 1500,
      quantity: 1,
      isFeesIncluded: true,
      discountType: "fixed",
      discountValue: 500,
    });
    assert.strictEqual(result.discountAmount, 500);
    assert.strictEqual(result.finalTotal, 1000);
    assert.ok(!result.isFree);
  });

  test("promo code - fixed amount exceeding subtotal is capped", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 500,
      quantity: 1,
      isFeesIncluded: true,
      discountType: "fixed",
      discountValue: 1000,
    });
    assert.strictEqual(result.discountAmount, 500);
    assert.strictEqual(result.finalTotal, 0);
    assert.ok(result.isFree);
  });

  test("promo code - 2 EUR ticket with 90% off rounds up to minimum", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 200,
      quantity: 1,
      isFeesIncluded: true,
      discountType: "percentage",
      discountValue: 90,
    });
    assert.strictEqual(result.discountAmount, 180);
    assert.strictEqual(result.finalTotal, 95);
    assert.ok(!result.isFree);
  });

  test("promo code - 1.50 EUR ticket with 50% off rounds up to minimum", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 150,
      quantity: 1,
      isFeesIncluded: true,
      discountType: "percentage",
      discountValue: 50,
    });
    assert.strictEqual(result.discountAmount, 75);
    assert.strictEqual(result.finalTotal, 95);
    assert.ok(!result.isFree);
  });

  test("promo code - 1 EUR ticket with fees excluded, 50% off stays chargeable", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 100,
      quantity: 1,
      isFeesIncluded: false,
      discountType: "percentage",
      discountValue: 50,
    });
    assert.strictEqual(result.discountAmount, 50);
    assert.ok(result.finalTotal >= 95);
    assert.ok(!result.isFree);
  });

  test("promo code - exactly 95 cents after discount stays chargeable", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 1000,
      quantity: 1,
      isFeesIncluded: true,
      discountType: "fixed",
      discountValue: 905,
    });
    assert.strictEqual(result.finalTotal, 95);
    assert.ok(!result.isFree);
  });

  test("promo code - 94 cents after discount rounds up to 95", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 1000,
      quantity: 1,
      isFeesIncluded: true,
      discountType: "fixed",
      discountValue: 906,
    });
    assert.strictEqual(result.finalTotal, 95);
    assert.ok(!result.isFree);
  });

  test("promo code - discount on multiple tickets", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 1500,
      quantity: 3,
      isFeesIncluded: true,
      discountType: "percentage",
      discountValue: 20,
    });
    assert.strictEqual(result.subtotal, 4500);
    assert.strictEqual(result.discountAmount, 900);
    assert.strictEqual(result.finalTotal, 3600);
    assert.ok(!result.isFree);
  });

  test("promo code - fee is proportionally reduced after discount", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 2000,
      quantity: 1,
      isFeesIncluded: true,
      discountType: "percentage",
      discountValue: 50,
    });
    assert.ok(result.finalFee < result.totalFee);
  });

  test("promo code - free order has zero fee", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 1500,
      quantity: 1,
      isFeesIncluded: true,
      discountType: "percentage",
      discountValue: 100,
    });
    assert.strictEqual(result.finalFee, 0);
  });

  test("promo code - free ticket with promo code stays free", () => {
    const result = buildOrderWithDiscount({
      ticketPrice: 0,
      quantity: 1,
      isFeesIncluded: true,
      discountType: "percentage",
      discountValue: 50,
    });
    assert.strictEqual(result.finalTotal, 0);
    assert.ok(result.isFree);
  });
}
