import assert from "node:assert/strict";
import test from "node:test";

import type { TonightPass } from "../../src/tonightpass";

export function careersTests(tnp: TonightPass) {
  test("It gets all careers categories", async () => {
    const result = await tnp.careers.categories.getAll();
    assert.ok(result.items);
    assert.ok(Array.isArray(result.items));
    assert.ok(result.items.length > 0);
    assert.ok(result.items[0].slug);
    assert.ok(typeof result.total === "number");
  });

  test("It gets all careers jobs", async () => {
    const result = await tnp.careers.jobs.getAll();
    assert.ok(result.items);
    assert.ok(Array.isArray(result.items));
    assert.ok(typeof result.total === "number");
  });

  test("It gets all careers offices", async () => {
    const result = await tnp.careers.offices.getAll();
    assert.ok(result.items);
    assert.ok(Array.isArray(result.items));
    assert.ok(typeof result.total === "number");
  });
}
