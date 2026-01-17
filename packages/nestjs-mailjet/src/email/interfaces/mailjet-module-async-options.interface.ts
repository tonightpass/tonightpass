import type { ModuleMetadata, Type } from "@nestjs/common";

import type { MailjetModuleOptions } from "./mailjet-module-options.interface";

export type MailjetOptionsFactory = {
  createMailjetOptions(): Promise<MailjetModuleOptions> | MailjetModuleOptions;
};

export type MailjetModuleAsyncOptions = Pick<ModuleMetadata, "imports"> & {
  inject?: any[];
  useClass?: Type<MailjetOptionsFactory>;
  useExisting?: Type<MailjetOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<MailjetModuleOptions> | MailjetModuleOptions;
};
