// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import assert from "node:assert";
import test from "node:test";

import { authTests } from "./auth";
import { careersTests } from "./careers";
import { dtoTests } from "./dtos";
import { regexTests } from "./regex";
import { requestTests } from "./request";
import { usersTests } from "./users";
import { TonightPass } from "../src/tonightpass";

const sdkTests = [
  authTests,
  careersTests,
  dtoTests,
  regexTests,
  requestTests,
  usersTests,
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
globalThis.TSUP_IS_NODE = true;

const API_URL =
  process.env.TEST_TONIGHTPASS_API_BASE_URL ??
  "https://api.staging.tonightpass.com";

const tnp = new TonightPass({
  baseURL: API_URL,
});

test("The HTTP client correctly forms URLs", () => {
  assert.equal(
    tnp.client.url("/path/to/:resource", {
      resource: "my-resource",
      limit: 20,
      skip: 20,
    }),
    API_URL + "/path/to/my-resource?limit=20&skip=20",
  );

  assert.equal(
    tnp.client.url("/path/to/:resource", {
      resource: "my-resource",
      limit: 20,
    }),
    API_URL + "/path/to/my-resource?limit=20",
  );

  assert.equal(
    tnp.client.url("/path/to/:resource/:param", {
      resource: "my-resource",
      param: "param2",
      limit: 20,
    }),
    API_URL + "/path/to/my-resource/param2?limit=20",
  );
});

test("The HTTP client can make a request", async () => {
  await assert.doesNotReject(() => tnp.client.get("/health/api"));
});

for (const sdkTest of sdkTests) {
  sdkTest(tnp);
}
