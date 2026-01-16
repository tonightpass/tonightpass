import assert from "node:assert/strict";
import test from "node:test";

import type { ErroredAPIResponse } from "../../src";
import type { TonightPass } from "../../src/tonightpass";

export function authTests(tnp: TonightPass) {
  test("It will fail to sign in to 'tonightpass'", async () => {
    try {
      await tnp.auth.signIn({
        identifier: "tonightpass",
        password: "1234",
      });
      assert.fail(
        "Expected the 'signIn' function to throw an error but it didn't"
      );
    } catch (error) {
      const typedError = error as ErroredAPIResponse;
      assert.strictEqual(
        typedError.success,
        false,
        "Expected error response to indicate failure"
      );
    }
  });
}
