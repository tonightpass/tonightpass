import assert from "node:assert/strict";
import test from "node:test";

import { TonightPassAPIError } from "../../../src";
import type { TonightPass } from "../../../src/tonightpass";

export function usersTests(tnp: TonightPass) {
  test("It will fail to get user 'me'", async () => {
    try {
      await tnp.users.me();
      assert.fail("Expected the 'me' function to throw an error but it didn't");
    } catch (error) {
      assert.ok(
        error instanceof TonightPassAPIError,
        "Expected error to be a TonightPassAPIError"
      );
      assert.strictEqual(
        error.status,
        401,
        "Expected status to be 401 Unauthorized"
      );
      assert.strictEqual(
        error.message,
        "Unauthorized",
        "Expected error message to be 'Unauthorized'"
      );
    }
  });

  test("It check 'tonightpass' username availability with suggestions", async () => {
    const response = await tnp.users.check("tonightpass", true);
    assert.strictEqual(response.exists, true);
    assert.strictEqual(response.identifier?.username, "tonightpass");
    assert.strictEqual(response.suggestions?.length, 3);
  });
}
