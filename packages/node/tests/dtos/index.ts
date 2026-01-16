import assert from "node:assert/strict";
import test from "node:test";
import { plainToInstance } from "class-transformer";
import { type ValidationError, validate } from "class-validator";

import {
  CreateOrganizationEventTicketDto,
  CreateUserDto,
} from "../../src/rest/dtos";
import {
  Currency,
  OrganizationEventTicketCategory,
  OrganizationEventTicketType,
  UserIdentityGender,
} from "../../src/rest/types";

function printValidationErrors(errors: ValidationError[]): string[] {
  const formatError = (error: ValidationError, prefix = ""): string[] => {
    let messages: string[] = [];
    if (error.constraints) {
      Object.entries(error.constraints).forEach(([key, value]) => {
        messages.push(`${prefix}${error.property} - ${key}: ${value}`);
      });
    }
    if (error.children) {
      error.children.forEach((child: ValidationError) => {
        messages = messages.concat(
          formatError(child, `${prefix}${error.property}.`)
        );
      });
    }
    return messages;
  };

  return errors.flatMap((error) => formatError(error));
}

export async function dtoTests() {
  test("CreateUserDto validation", async (t) => {
    await t.test("should fail with invalid email", async () => {
      const dto = plainToInstance(CreateUserDto, {
        identifier: {
          email: "invalid-email",
          username: "validuser123",
        },
        identity: {
          firstName: "John",
          lastName: "Doe",
          gender: UserIdentityGender.Male,
          birthDate: new Date().toISOString(),
        },
        password: "ValidPass123!",
      });

      const identifierErrors = await validate(dto.identifier);
      const hasEmailError = identifierErrors.some(
        (error) => error.property === "email" && error.constraints?.isEmail
      );

      assert(hasEmailError, "Expected validation error for invalid email");
    });

    await t.test("should fail with invalid password", async () => {
      const dto = plainToInstance(CreateUserDto, {
        identifier: {
          email: "test@example.com",
          username: "validuser123",
        },
        identity: {
          firstName: "John",
          lastName: "Doe",
          gender: UserIdentityGender.Male,
          birthDate: new Date().toISOString(),
        },
        password: "weak",
      });

      const errors = await validate(dto, {
        skipMissingProperties: false,
      });

      const hasPasswordError = errors.some(
        (error) => error.property === "password" && error.constraints?.matches
      );

      assert(hasPasswordError, "Expected validation error for weak password");
    });

    await t.test("should pass with valid DTO", async () => {
      const dto = plainToInstance(CreateUserDto, {
        identifier: {
          email: "test@example.com",
          username: "validuser123",
        },
        identity: {
          firstName: "John",
          lastName: "Doe",
          gender: UserIdentityGender.Male,
          birthDate: new Date().toISOString(),
        },
        password: "ValidPass123!",
      });

      const error = await validate(dto.identifier);
      const identityError = await validate(dto.identity);
      const mainError = await validate(dto, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      const totalErrors =
        error.length + identityError.length + mainError.length;
      assert.strictEqual(totalErrors, 0, "Expected no validation errors");
    });
  });

  test("CreateOrganizationEventTicketDto validation", async (t) => {
    await t.test("should pass with valid DTO", async () => {
      const dto = plainToInstance(CreateOrganizationEventTicketDto, {
        name: "VIP Ticket",
        description:
          "Access to VIP area, minimum length should be at least 16 chars",
        price: 100,
        quantity: 100,
        type: OrganizationEventTicketType.ETicket,
        category: OrganizationEventTicketCategory.Entry,
        currency: Currency.EUR,
        isVisible: true,
        isFeesIncluded: true,
      });

      const errors = await validate(dto);
      assert.strictEqual(errors.length, 0, "Expected no validation errors");
    });

    await t.test("should fail with invalid price", async () => {
      const dto = plainToInstance(CreateOrganizationEventTicketDto, {
        name: "VIP Ticket",
        description:
          "Access to VIP area, minimum length should be at least 16 chars",
        price: -10,
        quantity: 100,
        type: OrganizationEventTicketType.ETicket,
        category: OrganizationEventTicketCategory.Entry,
        currency: Currency.EUR,
        isVisible: true,
        isFeesIncluded: true,
      });

      const errors = await validate(dto);
      const hasPriceError = printValidationErrors(errors).some(
        (error) => error.includes("price") && error.includes("min")
      );
      assert(hasPriceError, "Expected validation error for negative price");
    });
  });
}
