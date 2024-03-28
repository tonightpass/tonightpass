import assert from "assert";
import test from "node:test";

import { TonightPass } from "../../src/tonightpass";

export function careersTests(tnp: TonightPass) {
  test("It gets all careers jobs", async () => {
    const careersJobs = await tnp.careers.jobs.getAll();
    assert.ok(Array.isArray(careersJobs));
  });

  test("It gets all careers offices", async () => {
    const careersOffices = await tnp.careers.offices.getAll();
    assert.ok(Array.isArray(careersOffices));
  });
}
