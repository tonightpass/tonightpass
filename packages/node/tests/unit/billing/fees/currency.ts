import assert from "node:assert/strict";
import test from "node:test";

import {
  Currency,
  calculateTicketFee,
  calculateTicketFeeWithCurrency,
  fromSmallestUnit,
  isZeroDecimalCurrency,
  MINIMUM_COMMISSION,
  toSmallestUnit,
} from "../../../../src";

export function billingFeesCurrencyTests() {
  test("MINIMUM_COMMISSION is 95 EUR cents", () => {
    assert.strictEqual(MINIMUM_COMMISSION, 95);
  });

  test("calculateTicketFeeWithCurrency - EUR ticket uses 95 cents minimum", () => {
    // 1 EUR ticket (100 cents), fees included
    const fee = calculateTicketFeeWithCurrency(100, true, MINIMUM_COMMISSION);
    assert.strictEqual(fee, 95, "EUR minimum should be 95 cents");
  });

  test("calculateTicketFeeWithCurrency - USD ticket with converted minimum", () => {
    // Simulate 95 EUR cents converted to USD at rate 1.09
    const convertedMinimum = Math.round(95 * 1.09); // ~104 USD cents
    const fee = calculateTicketFeeWithCurrency(100, true, convertedMinimum);
    assert.strictEqual(
      fee,
      convertedMinimum,
      "USD minimum should be the converted EUR amount"
    );
  });

  test("calculateTicketFeeWithCurrency - minimum must always be >= 95 EUR cents equivalent", () => {
    // For any currency, the minimum should never be less than 95 EUR cents
    // when properly converted
    const eurRate = 1.0;
    const usdRate = 1.09;
    const gbpRate = 0.86;

    const eurFee = calculateTicketFeeWithCurrency(
      100,
      true,
      Math.round(95 * eurRate)
    );
    const usdFee = calculateTicketFeeWithCurrency(
      100,
      true,
      Math.round(95 * usdRate)
    );
    const gbpFee = calculateTicketFeeWithCurrency(
      100,
      true,
      Math.round(95 * gbpRate)
    );

    // All should be at their converted minimum since 100 cents is a small ticket
    assert.strictEqual(eurFee, 95, "EUR minimum");
    assert.strictEqual(usdFee, Math.round(95 * usdRate), "USD minimum");
    assert.strictEqual(gbpFee, Math.round(95 * gbpRate), "GBP minimum");
  });

  test("calculateTicketFeeWithCurrency - high price ticket should exceed minimum in any currency", () => {
    // 100 EUR ticket (10000 cents) - fee should be higher than minimum
    const fee = calculateTicketFeeWithCurrency(10_000, true, 95);
    assert.ok(
      fee > 95,
      `Fee for 100 EUR ticket should exceed minimum, got ${fee}`
    );
  });

  test("calculateTicketFeeWithCurrency - zero price returns zero regardless of currency", () => {
    assert.strictEqual(calculateTicketFeeWithCurrency(0, true, 104), 0);
    assert.strictEqual(calculateTicketFeeWithCurrency(0, false, 82), 0);
  });

  test("calculateTicketFeeWithCurrency - fees not included uses converted minimum", () => {
    const convertedMinimum = 104; // ~95 EUR in USD
    const fee = calculateTicketFeeWithCurrency(100, false, convertedMinimum);
    assert.strictEqual(
      fee,
      convertedMinimum,
      "Fees not included should also use converted minimum"
    );
  });

  test("calculateTicketFee without currency conversion uses EUR minimum (bug scenario)", () => {
    // This is the bug: using calculateTicketFee directly on a USD ticket
    // applies 95 as if it were USD cents, not EUR cents
    const feeWithoutConversion = calculateTicketFee(100, true);
    assert.strictEqual(
      feeWithoutConversion,
      95,
      "Without conversion, minimum is 95 (treated as local currency)"
    );

    // With proper conversion (USD rate ~1.09), minimum should be higher
    const feeWithConversion = calculateTicketFeeWithCurrency(
      100,
      true,
      Math.round(95 * 1.09)
    );
    assert.ok(
      feeWithConversion > feeWithoutConversion,
      `Converted fee (${feeWithConversion}) should be > unconverted fee (${feeWithoutConversion})`
    );
  });

  test("toSmallestUnit and fromSmallestUnit - EUR (decimal currency)", () => {
    assert.strictEqual(toSmallestUnit(10, Currency.EUR), 1000);
    assert.strictEqual(fromSmallestUnit(1000, Currency.EUR), 10);
  });

  test("toSmallestUnit and fromSmallestUnit - JPY (zero-decimal currency)", () => {
    assert.strictEqual(isZeroDecimalCurrency(Currency.JPY), true);
    assert.strictEqual(toSmallestUnit(500, Currency.JPY), 500);
    assert.strictEqual(fromSmallestUnit(500, Currency.JPY), 500);
  });

  test("toSmallestUnit and fromSmallestUnit - USD (decimal currency)", () => {
    assert.strictEqual(isZeroDecimalCurrency(Currency.USD), false);
    assert.strictEqual(toSmallestUnit(10.5, Currency.USD), 1050);
    assert.strictEqual(fromSmallestUnit(1050, Currency.USD), 10.5);
  });

  test("calculateTicketFeeWithCurrency - JPY zero-decimal currency", () => {
    // 500 JPY ticket, minimum converted from EUR (e.g., 95 * 170 = 16150 JPY)
    // But since JPY is zero-decimal, 16150 JPY is the minimum
    const jpyMinimum = Math.round(95 * 170); // ~16150 JPY
    const fee = calculateTicketFeeWithCurrency(500, true, jpyMinimum);
    assert.strictEqual(
      fee,
      jpyMinimum,
      "JPY fee should be the converted minimum for small tickets"
    );
  });

  test("calculateTicketFeeWithCurrency matches calculateTicketFee for EUR", () => {
    // For EUR, converted minimum = MINIMUM_COMMISSION (no conversion needed)
    const prices = [100, 500, 1000, 5000, 10_000, 50_000];
    for (const price of prices) {
      const feeOld = calculateTicketFee(price, true);
      const feeNew = calculateTicketFeeWithCurrency(
        price,
        true,
        MINIMUM_COMMISSION
      );
      assert.strictEqual(
        feeNew,
        feeOld,
        `EUR fee mismatch for price ${price}: old=${feeOld}, new=${feeNew}`
      );
    }
  });
}
