import { HttpModule } from "@nestjs/axios";
import { DynamicModule, Module, Provider } from "@nestjs/common";

import { MailjetModuleOptions } from "./interfaces";
import {
  MailjetModuleAsyncOptions,
  MailjetOptionsFactory,
} from "./interfaces/mailjet-module-async-options.interface";
import { createMailjetProviders } from "./mailjet.provider";
import { MailjetService } from "./mailjet.service";
import { MAILJET_MODULE_OPTIONS } from "../constants/mailjet.constants";

@Module({
  imports: [HttpModule],
  providers: [MailjetService],
  exports: [MailjetService],
})
export class MailjetModule {
  static forRoot(options: MailjetModuleOptions): DynamicModule {
    return {
      module: MailjetModule,
      providers: createMailjetProviders(options),
    };
  }

  static forRootAsync(options: MailjetModuleAsyncOptions): DynamicModule {
    const providers = [...this.createAsyncProviders(options)];

    return {
      module: MailjetModule,
      imports: options.imports || [],
      providers,
    };
  }

  private static createAsyncProviders(
    options: MailjetModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProviders(options)];
    }

    if (!options.useClass) throw new Error("Invalid MailjetModuleAsyncOptions");

    return [
      this.createAsyncOptionsProviders(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProviders(
    options: MailjetModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: MAILJET_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: MAILJET_MODULE_OPTIONS,
      useFactory: async (optionsFactory: MailjetOptionsFactory) =>
        await optionsFactory.createMailjetOptions(),
      inject: [options.useExisting || options.useClass!],
    };
  }
}
