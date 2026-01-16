import assert from "node:assert/strict";
import test from "node:test";

import { REGEX } from "../../src";

export function regexTests() {
  test("EMAIL regex", () => {
    assert.ok(REGEX.EMAIL.test("example@example.com"));
    assert.ok(!REGEX.EMAIL.test("example@.com"));
    assert.ok(!REGEX.EMAIL.test("example@com"));
    assert.ok(REGEX.EMAIL.test("user.name+tag+sorting@example.com"));
    assert.ok(!REGEX.EMAIL.test("user name@example.com"));
  });

  test("NAME regex", () => {
    assert.ok(REGEX.NAME.test("John Doe"));
    assert.ok(REGEX.NAME.test("JohnDoe123"));
    assert.ok(REGEX.NAME.test("Jöhn Döé"));
    assert.ok(REGEX.NAME.test("John-Doe"));
    assert.ok(!REGEX.NAME.test("John_Doe"));
    assert.ok(!REGEX.NAME.test("JohnDoe!"));
  });

  test("USERNAME regex", () => {
    assert.ok(REGEX.USERNAME.test("slug_123"));
    assert.ok(REGEX.USERNAME.test("slug.123"));
    assert.ok(!REGEX.USERNAME.test("slug-123"));
    assert.ok(!REGEX.USERNAME.test("Slug123"));
    assert.ok(!REGEX.USERNAME.test("slug#123"));
    assert.ok(!REGEX.USERNAME.test("!slug123"));
    assert.ok(!REGEX.USERNAME.test("slug123😀"));
    assert.ok(!REGEX.USERNAME.test(".slug123"));
    assert.ok(!REGEX.USERNAME.test("slug123."));
    assert.ok(!REGEX.USERNAME.test("SLUG123"));
  });

  test("PHONE regex", () => {
    assert.ok(REGEX.PHONE.test("+1234567890"));
    assert.ok(REGEX.PHONE.test("+12 345 678 9012"));
    assert.ok(!REGEX.PHONE.test("1234567890"));
    assert.ok(!REGEX.PHONE.test("+1 (234) 567-890"));
    assert.ok(!REGEX.PHONE.test("+12 3456 7890 12 3456"));
  });

  test("PASSWORD regex", () => {
    assert.ok(REGEX.PASSWORD.test("Password1"));
    assert.ok(REGEX.PASSWORD.test("P@ssword"));
    assert.ok(!REGEX.PASSWORD.test("password1"));
    assert.ok(!REGEX.PASSWORD.test("PASSWORD1"));
    assert.ok(!REGEX.PASSWORD.test("Password"));
    assert.ok(!REGEX.PASSWORD.test("P1"));
  });

  test("PASSWORD_MIN_LENGTH regex", () => {
    assert.ok(REGEX.PASSWORD_MIN_LENGTH.test("Password1"));
    assert.ok(!REGEX.PASSWORD_MIN_LENGTH.test("Pass1"));
  });

  test("PASSWORD_UPPERCASE regex", () => {
    assert.ok(REGEX.PASSWORD_UPPERCASE.test("Password"));
    assert.ok(!REGEX.PASSWORD_UPPERCASE.test("password"));
  });

  test("PASSWORD_LOWERCASE regex", () => {
    assert.ok(REGEX.PASSWORD_LOWERCASE.test("Password"));
    assert.ok(!REGEX.PASSWORD_LOWERCASE.test("PASSWORD"));
  });

  test("PASSWORD_NUMBER_SPECIAL regex", () => {
    assert.ok(REGEX.PASSWORD_NUMBER_SPECIAL.test("Password1"));
    assert.ok(REGEX.PASSWORD_NUMBER_SPECIAL.test("P@ssword"));
    assert.ok(!REGEX.PASSWORD_NUMBER_SPECIAL.test("Password"));
  });

  test("IMAGE_URL regex", () => {
    assert.ok(REGEX.IMAGE_URL.test("http://example.com/image.jpg"));
    assert.ok(REGEX.IMAGE_URL.test("https://www.example.com/image.jpeg"));
    assert.ok(!REGEX.IMAGE_URL.test("www.example.com/image.png"));
    assert.ok(!REGEX.IMAGE_URL.test("example.com/image"));
    assert.ok(!REGEX.IMAGE_URL.test("https://example.com/image.txt"));
  });
}
