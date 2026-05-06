import type { TonightPass } from "../../src/tonightpass";
import { authTests } from "./auth";
import { careersTests } from "./careers";
import { dtoTests } from "./dtos";
import { regexTests } from "./regex";
import { requestTests } from "./request";
import { usersTests } from "./users";

const integrationTests = [
  authTests,
  careersTests,
  dtoTests,
  regexTests,
  requestTests,
  usersTests,
];

export function runIntegrationTests(tnp: TonightPass) {
  for (const integrationTest of integrationTests) {
    integrationTest(tnp);
  }
}
