import assert from "node:assert/strict";
import test from "node:test";

import { OAuth2Provider } from "../../src";
import type { TonightPass } from "../../src/tonightpass";

export function requestTests(tnp: TonightPass) {
  test("GET request without body succeeds", async () => {
    const result = await tnp.health.api();
    assert.ok(result, "Expected health check to return a result");
  });

  test("POST request with empty body (undefined) does not throw Content-Type error", async () => {
    // signOut is a POST request with undefined body
    // It should fail with auth error, not with "Body cannot be empty when content-type is set"
    try {
      await tnp.auth.signOut();
      // If it succeeds (unlikely without auth), that's fine
    } catch (error) {
      const typedError = error as { message?: string; statusCode?: number };
      // Should NOT be the Content-Type body error
      assert.notStrictEqual(
        typedError.message,
        "Body cannot be empty when content-type is set to 'application/json'",
        "Request should not fail due to empty body Content-Type issue"
      );
      // Expected to fail with 401 Unauthorized since we're not authenticated
      assert.ok(
        typedError.statusCode === 401 || typedError.statusCode === 403,
        `Expected auth error (401/403), got: ${typedError.statusCode} - ${typedError.message}`
      );
    }
  });

  test("POST request with JSON body succeeds", async () => {
    // signIn is a POST request with JSON body
    // It should fail with invalid credentials, not with serialization issues
    try {
      await tnp.auth.signIn({
        identifier: "test-request-body",
        password: "invalid-password-12345",
      });
      assert.fail("Expected signIn to fail with invalid credentials");
    } catch (error) {
      const typedError = error as { message?: string; statusCode?: number };
      // Should NOT be a body serialization error
      assert.notStrictEqual(
        typedError.message,
        "Body cannot be empty when content-type is set to 'application/json'",
        "Request should not fail due to Content-Type issue"
      );
      // Should fail with authentication error
      assert.ok(
        typedError.statusCode === 400 || typedError.statusCode === 401,
        `Expected auth error, got: ${typedError.statusCode}`
      );
    }
  });

  test("DELETE request with empty body (undefined) does not throw Content-Type error", async () => {
    // OAuth disconnect is a DELETE request with undefined body
    try {
      await tnp.auth.oauth2.disconnect(OAuth2Provider.Google);
    } catch (error) {
      const typedError = error as { message?: string; statusCode?: number };
      // Should NOT be the Content-Type body error
      assert.notStrictEqual(
        typedError.message,
        "Body cannot be empty when content-type is set to 'application/json'",
        "DELETE request should not fail due to empty body Content-Type issue"
      );
      // Expected to fail with 401 Unauthorized since we're not authenticated
      assert.ok(
        typedError.statusCode === 401 || typedError.statusCode === 403,
        `Expected auth error (401/403), got: ${typedError.statusCode} - ${typedError.message}`
      );
    }
  });
}
