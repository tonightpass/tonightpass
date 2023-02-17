import { Provider } from "@nestjs/common";
import { MAILJET_MODULE_OPTIONS } from "./constants/mailjet.constants";
import { MailjetModuleOptions } from "./interfaces/mailjet-module-options.interface";

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
