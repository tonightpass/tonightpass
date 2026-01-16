import assert from "node:assert/strict";
import test from "node:test";

import type { TonightPass } from "../../src/tonightpass";

export function careersTests(tnp: TonightPass) {
  test("It gets all careers categories", async () => {
    const careersCategories = await tnp.careers.categories.getAll();
    assert.ok(
      Array.isArray(careersCategories) &&
        careersCategories.length > 0 &&
        careersCategories[0].slug
    );
  });

  test("It gets all careers jobs", async () => {
    const careersJobs = await tnp.careers.jobs.getAll();
    assert.ok(Array.isArray(careersJobs));
  });

  test("It gets all careers offices", async () => {
    const careersOffices = await tnp.careers.offices.getAll({
      page: 1,
      pageSize: 10,
    });
    assert.ok(Array.isArray(careersOffices));
  });
}
