import { HttpModule } from "@nestjs/axios";
import { type DynamicModule, Module, type Provider } from "@nestjs/common";
import { MAILJET_MODULE_OPTIONS } from "../constants/mailjet.constants";
import type { MailjetModuleOptions } from "./interfaces";
import type {
  MailjetModuleAsyncOptions,
  MailjetOptionsFactory,
} from "./interfaces/mailjet-module-async-options.interface";
import { createMailjetProviders } from "./mailjet.provider";
import { MailjetService } from "./mailjet.service";

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
    const providers = [...MailjetModule.createAsyncProviders(options)];

    return {
      module: MailjetModule,
      imports: options.imports || [],
      providers,
    };
  }

  private static createAsyncProviders(
    options: MailjetModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [MailjetModule.createAsyncOptionsProviders(options)];
    }

    return [
      MailjetModule.createAsyncOptionsProviders(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProviders(
    options: MailjetModuleAsyncOptions
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
      inject: [options.useExisting || options.useClass],
    };
  }
}
