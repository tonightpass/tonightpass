import { ModuleMetadata, Type } from "@nestjs/common";
import { IMailjetModuleOptions } from "./mailjet-module-options.interface";

export interface IMailjetOptionsFactory {
  createMailjetOptions():
    | Promise<IMailjetModuleOptions>
    | IMailjetModuleOptions;
}

export interface IMailjetModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useClass?: Type<IMailjetOptionsFactory>;
  useExisting?: Type<IMailjetOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<IMailjetModuleOptions> | IMailjetModuleOptions;
}
