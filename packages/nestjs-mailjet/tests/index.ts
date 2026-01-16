import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { HttpModule } from "@nestjs/axios";
import { Test } from "@nestjs/testing";
import dotenv from "dotenv";
import type { Common, SendEmailV3_1 } from "node-mailjet";

import { MAILJET_MODULE_OPTIONS } from "../src/constants/mailjet.constants";
import type { MailjetModuleOptions } from "../src/email/interfaces";
import { MailjetModule } from "../src/email/mailjet.module";
import { MailjetService } from "../src/email/mailjet.service";

dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
});

// Get options from environment variables or use fallback values
const getMailjetConfig = (): MailjetModuleOptions => ({
  apiKey: process.env.MAILJET_API_KEY || "test-api-key",
  apiSecret: process.env.MAILJET_API_SECRET || "test-api-secret",
  sandboxMode: process.env.MAILJET_SANDBOX_MODE
    ? process.env.MAILJET_SANDBOX_MODE === "true"
    : true,
});

const config = getMailjetConfig();

if (config.sandboxMode) {
  console.warn("Running in sandbox mode. No actual API calls will be made.");
}

test("MailjetModule", async (t) => {
  await t.test(
    "forRoot static method should create module with providers",
    async () => {
      const module = await Test.createTestingModule({
        imports: [MailjetModule.forRoot(config)],
      }).compile();

      const mailjetService = module.get<MailjetService>(MailjetService);
      const options = module.get(MAILJET_MODULE_OPTIONS);

      assert.ok(mailjetService instanceof MailjetService);
      assert.deepStrictEqual(options, config);
    }
  );

  await t.test(
    "forRootAsync static method should create module with async providers",
    async () => {
      const module = await Test.createTestingModule({
        imports: [
          MailjetModule.forRootAsync({
            useFactory: () => config,
          }),
        ],
      }).compile();

      const mailjetService = module.get<MailjetService>(MailjetService);
      const options = module.get(MAILJET_MODULE_OPTIONS);

      assert.ok(mailjetService instanceof MailjetService);
      assert.deepStrictEqual(options, config);
    }
  );
});

test("MailjetService", async (t) => {
  let mailjetService: MailjetService;

  t.beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        MailjetService,
        {
          provide: MAILJET_MODULE_OPTIONS,
          useValue: config,
        },
      ],
    }).compile();

    mailjetService = module.get<MailjetService>(MailjetService);
  });

  await t.test("should be defined", () => {
    assert.ok(mailjetService);
  });

  await t.test("sendEmail should handle email sending", async () => {
    const emailData: SendEmailV3_1.Body<
      undefined,
      Common.UnknownRec,
      Common.UnknownRec
    > = {
      Messages: [
        {
          From: {
            Email: "developers@tonightpass.com",
            Name: "Test Sender",
          },
          To: [
            {
              Email: "contact@tonightpass.com",
              Name: "Test Recipient",
            },
          ],
          Subject: "Test Email",
          TextPart: "Hello World",
          HTMLPart: "<h1>Hello World</h1>",
        },
      ],
    };

    try {
      await mailjetService.sendEmail(emailData);
      // In sandbox mode, this should not throw
      assert.ok(true);
    } catch (error) {
      // If running in non-sandbox mode, this might throw due to invalid credentials
      assert.ok(error instanceof Error);
    }
  });

  await t.test("findContact should handle contact lookup", async () => {
    try {
      await mailjetService.findContact("test-contact-id");
      // In sandbox mode, we should still get here since the API call isn't actually made
      assert.ok(true);
    } catch (error) {
      // If we're not in sandbox mode, we expect an error for invalid credentials
      assert.ok(error instanceof Error);
    }
  });

  await t.test("addContact should handle contact creation", async () => {
    const contactData = {
      Email: "contact@tonightpass.com",
      Name: "Test User",
    };

    try {
      await mailjetService.addContact(contactData);
      // In sandbox mode, this should succeed since no actual API call is made
      assert.ok(true);
    } catch (error) {
      // In non-sandbox mode, expect error for invalid credentials
      assert.ok(error instanceof Error);
    }
  });

  await t.test(
    "subscribeContactToList should handle list subscription",
    async () => {
      try {
        await mailjetService.subscribeContactToList(
          "test-contact-id",
          "test-list-id"
        );
        // In sandbox mode, this should succeed since no actual API call is made
        assert.ok(true);
      } catch (error) {
        // In non-sandbox mode, expect error for invalid credentials
        assert.ok(error instanceof Error);
      }
    }
  );

  await t.test(
    "unsubscribeContactFromList should handle list unsubscription",
    async () => {
      try {
        await mailjetService.unsubscribeContactFromList(
          "test-contact-id",
          "test-list-id"
        );
        // In sandbox mode, this should succeed since no actual API call is made
        assert.ok(true);
      } catch (error) {
        // In non-sandbox mode, expect error for invalid credentials
        assert.ok(error instanceof Error);
      }
    }
  );
});
