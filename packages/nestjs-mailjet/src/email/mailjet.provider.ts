import { Provider } from "@nestjs/common";

import { MailjetModuleOptions } from "./interfaces/mailjet-module-options.interface";
import { MAILJET_MODULE_OPTIONS } from "../constants/mailjet.constants";

export function createMailjetProviders(
  options: MailjetModuleOptions,
): Provider[] {
  return [
    {
      provide: MAILJET_MODULE_OPTIONS,
      useValue: options,
    },
  ];
}
