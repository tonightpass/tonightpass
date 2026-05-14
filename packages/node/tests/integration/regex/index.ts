// biome-ignore-all lint/suspicious/noMisplacedAssertion: assertions live in the ASSERTIONS map and are invoked from within test() blocks below.
import assert from "node:assert/strict";
import test from "node:test";

import { REGEX } from "../../../src";

function flattenRegexKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (v instanceof RegExp) {
      keys.push(fullKey);
    } else if (v && typeof v === "object") {
      keys.push(...flattenRegexKeys(v as Record<string, unknown>, fullKey));
    }
  }
  return keys;
}

function resolveRegex(key: string): RegExp {
  return key
    .split(".")
    .reduce<unknown>(
      (acc, p) => (acc as Record<string, unknown>)[p],
      REGEX
    ) as RegExp;
}

// One assertion block per REGEX path. Adding a new regex to `REGEX` will fail
// the suite until an entry is added here — no separate list to keep in sync.
const ASSERTIONS: Record<string, (regex: RegExp) => void> = {
  EMAIL: (r) => {
    assert.ok(r.test("example@example.com"));
    assert.ok(!r.test("example@.com"));
    assert.ok(!r.test("example@com"));
    assert.ok(r.test("user.name+tag+sorting@example.com"));
    assert.ok(!r.test("user name@example.com"));
  },

  NAME: (r) => {
    assert.ok(r.test("John Doe"));
    assert.ok(r.test("JohnDoe123"));
    assert.ok(r.test("Jöhn Döé"));
    assert.ok(r.test("John-Doe"));
    assert.ok(!r.test("John_Doe"));
    assert.ok(!r.test("JohnDoe!"));
  },

  SLUG: (r) => {
    assert.ok(r.test("event_name"));
    assert.ok(r.test("event.name"));
    assert.ok(r.test("event123"));
    assert.ok(!r.test("event-name"));
    assert.ok(!r.test("Event"));
    assert.ok(!r.test("event name"));
    assert.ok(!r.test("event!"));
  },

  USERNAME: (r) => {
    assert.ok(r.test("slug_123"));
    assert.ok(r.test("slug.123"));
    assert.ok(!r.test("slug-123"));
    assert.ok(!r.test("Slug123"));
    assert.ok(!r.test("slug#123"));
    assert.ok(!r.test("!slug123"));
    assert.ok(!r.test("slug123😀"));
    assert.ok(!r.test(".slug123"));
    assert.ok(!r.test("slug123."));
    assert.ok(!r.test("SLUG123"));
  },

  PHONE: (r) => {
    assert.ok(r.test("+1234567890"));
    assert.ok(r.test("+12 345 678 9012"));
    assert.ok(!r.test("1234567890"));
    assert.ok(!r.test("+1 (234) 567-890"));
    assert.ok(!r.test("+12 3456 7890 12 3456"));
  },

  PASSWORD: (r) => {
    assert.ok(r.test("Password1"));
    assert.ok(r.test("P@ssword"));
    assert.ok(!r.test("password1"));
    assert.ok(!r.test("PASSWORD1"));
    assert.ok(!r.test("Password"));
    assert.ok(!r.test("P1"));
  },

  PASSWORD_MIN_LENGTH: (r) => {
    assert.ok(r.test("Password1"));
    assert.ok(!r.test("Pass1"));
  },

  PASSWORD_UPPERCASE: (r) => {
    assert.ok(r.test("Password"));
    assert.ok(!r.test("password"));
  },

  PASSWORD_LOWERCASE: (r) => {
    assert.ok(r.test("Password"));
    assert.ok(!r.test("PASSWORD"));
  },

  PASSWORD_NUMBER_SPECIAL: (r) => {
    assert.ok(r.test("Password1"));
    assert.ok(r.test("P@ssword"));
    assert.ok(!r.test("Password"));
  },

  IMAGE_URL: (r) => {
    assert.ok(r.test("http://example.com/image.jpg"));
    assert.ok(r.test("https://www.example.com/image.jpeg"));
    assert.ok(!r.test("www.example.com/image.png"));
    assert.ok(!r.test("example.com/image"));
    assert.ok(!r.test("https://example.com/image.txt"));
  },

  ORGANIZATION_AVATAR_URL: (r) => {
    assert.ok(
      r.test(
        "https://cdn.tonightpass.com/organizations/abc-123/avatars/foo.png"
      )
    );
    assert.ok(
      r.test(
        "https://cdn.staging.tonightpass.com/organizations/abc-123/avatars/foo.png"
      )
    );
    assert.ok(
      !r.test(
        "https://cdn.tonightpass.com/organizations/abc-123/banners/foo.png"
      )
    );
    assert.ok(
      !r.test("https://other.com/organizations/abc-123/avatars/foo.png")
    );
  },

  ORGANIZATION_BANNER_URL: (r) => {
    assert.ok(
      r.test(
        "https://cdn.tonightpass.com/organizations/abc-123/banners/foo.png"
      )
    );
    assert.ok(
      !r.test(
        "https://cdn.tonightpass.com/organizations/abc-123/avatars/foo.png"
      )
    );
  },

  EVENT_FLYER_URL: (r) => {
    assert.ok(r.test("https://cdn.tonightpass.com/temp/events/flyers/foo.png"));
    assert.ok(
      r.test(
        "https://cdn.tonightpass.com/organizations/org-1/events/evt-1/flyers/foo.png"
      )
    );
    assert.ok(
      !r.test(
        "https://cdn.tonightpass.com/organizations/org-1/events/evt-1/trailers/foo.mp4"
      )
    );
  },

  EVENT_FLYER_URL_UPDATE: (r) => {
    assert.ok(r.test("https://cdn.payload.tonightpass.com/foo.png"));
    assert.ok(r.test("https://cdn.tonightpass.com/temp/events/flyers/foo.png"));
  },

  EVENT_TRAILER_URL: (r) => {
    assert.ok(
      r.test("https://cdn.tonightpass.com/temp/events/trailers/foo.mp4")
    );
    assert.ok(
      r.test(
        "https://cdn.tonightpass.com/organizations/org-1/events/evt-1/trailers/foo.mp4"
      )
    );
    assert.ok(
      !r.test(
        "https://cdn.tonightpass.com/organizations/org-1/events/evt-1/flyers/foo.png"
      )
    );
  },

  EVENT_TRAILER_URL_UPDATE: (r) => {
    assert.ok(r.test("https://cdn.payload.tonightpass.com/foo.mp4"));
    assert.ok(
      r.test("https://cdn.tonightpass.com/temp/events/trailers/foo.mp4")
    );
  },

  USER_AVATAR_URL: (r) => {
    assert.ok(
      r.test("https://cdn.tonightpass.com/users/abc-123/avatars/foo.png")
    );
    assert.ok(
      !r.test("https://cdn.tonightpass.com/users/abc-123/banners/foo.png")
    );
    assert.ok(
      !r.test("https://cdn.tonightpass.com/temp/users/avatars/foo.png")
    );
  },

  USER_AVATAR_URL_CREATE: (r) => {
    assert.ok(
      r.test("https://cdn.tonightpass.com/users/abc-123/avatars/foo.png")
    );
    assert.ok(r.test("https://cdn.tonightpass.com/temp/users/avatars/foo.png"));
  },

  USER_BANNER_URL: (r) => {
    assert.ok(
      r.test("https://cdn.tonightpass.com/users/abc-123/banners/foo.png")
    );
    assert.ok(
      !r.test("https://cdn.tonightpass.com/users/abc-123/avatars/foo.png")
    );
  },

  CHANNEL_MESSAGE_ATTACHMENT: (r) => {
    assert.ok(r.test("channels/abc-1/messages/msg-1/private/file-1"));
    assert.ok(!r.test("channels/abc-1/messages/msg-1/public/file-1"));
    assert.ok(!r.test("channels/abc-1"));
  },

  USER_POST_MEDIA_URL: (r) => {
    assert.ok(r.test("https://cdn.tonightpass.com/temp/posts/media/foo.png"));
    assert.ok(
      r.test(
        "https://cdn.tonightpass.com/users/abc-1/posts/post-1/media/foo.png"
      )
    );
    assert.ok(
      !r.test(
        "https://cdn.tonightpass.com/organizations/org-1/posts/post-1/media/foo.png"
      )
    );
  },

  "INLINE.EMAIL": (r) => {
    assert.equal(
      "Contact me at hello@example.com tomorrow".match(r)?.[0],
      "hello@example.com"
    );
    assert.equal("data@arkee.fr".match(r)?.[0], "data@arkee.fr");
    assert.equal("no email here".match(r), null);
  },

  "INLINE.URL": (r) => {
    assert.equal(
      "visit https://example.com please".match(r)?.[0],
      "https://example.com"
    );
    assert.equal("http://x.io".match(r)?.[0], "http://x.io");
    assert.equal("example.com".match(r), null);
  },

  "INLINE.USER_MENTION": (r) => {
    r.lastIndex = 0;
    const m1 = r.exec("hello @orionmood !");
    assert.equal(m1?.[1], "orionmood");
    r.lastIndex = 0;
    const m2 = r.exec("contact data@arkee.fr");
    // The mention regex will match the @arkee.fr part of an email — by design,
    // disambiguation is handled at the parser level (emails are preferred).
    assert.equal(m2?.[1], "arkee.fr");
  },

  "INLINE.ARTIST_MENTION": (r) => {
    r.lastIndex = 0;
    const m1 = r.exec("check out +peggygou tonight");
    assert.equal(m1?.[1], "peggygou");
    r.lastIndex = 0;
    assert.equal(r.exec("no plus here"), null);
  },
};

export function regexTests() {
  for (const key of flattenRegexKeys(
    REGEX as unknown as Record<string, unknown>
  )) {
    test(`${key} regex`, () => {
      const run = ASSERTIONS[key];
      assert.ok(
        run,
        `Missing assertions for REGEX.${key}. Add an entry to ASSERTIONS in tests/integration/regex/index.ts.`
      );
      run(resolveRegex(key));
    });
  }
}
