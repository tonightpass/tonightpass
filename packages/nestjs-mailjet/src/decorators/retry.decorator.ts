import { Logger } from "@nestjs/common";

import { MailjetErrorResponse } from "../types/mailjet-response";
import { RetryOptions } from "../types/retry-options";
import { defaultShouldRetry } from "../utils/default-should-retry";
import { isMailjetErrorResponse } from "../utils/is-mailjet-error-response";
import { isMailjetResponse } from "../utils/is-mailjet-response";
import { isSuccessfulResponse } from "../utils/is-successful-response";

export type MailjetMethodOptions = Omit<RetryOptions, "shouldRetry">;

type MethodDecorator<T> = (
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>,
) => TypedPropertyDescriptor<T> | void;

export const Retry = <T extends (...args: never[]) => Promise<unknown>>(
  options: RetryOptions<ReturnType<T>> = {},
): MethodDecorator<T> => {
  const logger = new Logger("MailjetRetryDecorator");

  return (
    _: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ): TypedPropertyDescriptor<T> | void => {
    const originalMethod = descriptor.value;
    if (!originalMethod) return;

    descriptor.value = async function (
      this: unknown,
      ...args: Parameters<T>
    ): Promise<ReturnType<T>> {
      const {
        attempts = 3,
        delay = 1000,
        shouldRetry = defaultShouldRetry,
        expectedStatus = 200,
      } = options;

      let lastError: Error | null = null;

      for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
          const result = await originalMethod.apply(this, args);

          if (isMailjetResponse(result)) {
            if (!isSuccessfulResponse(result, expectedStatus)) {
              throw new Error(
                `Mailjet operation failed with status ${result.response.status}`,
              );
            }
          }

          return result as ReturnType<T>;
        } catch (error) {
          const mailjetError: MailjetErrorResponse = isMailjetErrorResponse(
            error,
          )
            ? error
            : {
                StatusCode: 500,
                ErrorMessage: String(error),
                ErrorCode: "",
                ErrorIdentifier: "",
              };

          lastError = error instanceof Error ? error : new Error(String(error));

          if (!shouldRetry(mailjetError) || attempt === attempts) {
            throw lastError;
          }

          logger.debug(
            `Attempt ${attempt}/${attempts} failed for ${String(propertyKey)}. Retrying in ${delay}ms...`,
          );

          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      throw (
        lastError ||
        new Error(`All retry attempts failed for ${String(propertyKey)}`)
      );
    } as T;

    return descriptor;
  };
};
