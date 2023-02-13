import { Provider } from "@nestjs/common";
import { MAILJET_MODULE_OPTIONS } from "./constants/mailjet.constants";
import { IMailjetModuleOptions } from "./interfaces/mailjet-module-options.interface";

export function createMailjetProvider(
  options: IMailjetModuleOptions
): Provider[] {
  return [
    {
      provide: MAILJET_MODULE_OPTIONS,
      useValue: options || {},
    },
  ];
}
