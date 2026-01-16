import type { Provider } from "@nestjs/common";
import { MAILJET_MODULE_OPTIONS } from "../constants/mailjet.constants";
import type { MailjetModuleOptions } from "./interfaces";

export function createMailjetProviders(
  options: MailjetModuleOptions
): Provider[] {
  return [
    {
      provide: MAILJET_MODULE_OPTIONS,
      useValue: options,
    },
  ];
}
