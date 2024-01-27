/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModuleMetadata, Type } from "@nestjs/common";

import { MailjetModuleOptions } from "./mailjet-module-options.interface";

export interface MailjetOptionsFactory {
  createMailjetOptions(): Promise<MailjetModuleOptions> | MailjetModuleOptions;
}

export interface MailjetModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useClass?: Type<MailjetOptionsFactory>;
  useExisting?: Type<MailjetOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<MailjetModuleOptions> | MailjetModuleOptions;
}
