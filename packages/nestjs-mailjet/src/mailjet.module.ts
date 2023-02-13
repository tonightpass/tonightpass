/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HttpModule } from "@nestjs/axios";
import { DynamicModule, Module, Provider } from "@nestjs/common";
import { MAILJET_MODULE_OPTIONS } from "./constants/mailjet.constants";
import {
  IMailjetModuleAsyncOptions,
  IMailjetOptionsFactory,
} from "./interfaces/mailjet-module-async-options.interface";
import { IMailjetModuleOptions } from "./interfaces/mailjet-module-options.interface";
import { createMailjetProvider } from "./mailjet.provider";
import { MailjetService } from "./services/mailjet.service";

@Module({
  imports: [HttpModule],
  providers: [MailjetService],
  exports: [MailjetService],
})
export class MailjetModule {
  static forRoot(options: IMailjetModuleOptions): DynamicModule {
    return {
      module: MailjetModule,
      providers: createMailjetProvider(options),
    };
  }

  static forRootAsync(options: IMailjetModuleAsyncOptions): DynamicModule {
    return {
      module: MailjetModule,
      imports: options.imports || [],
      providers: this.createAsyncProvider(options),
    };
  }

  private static createAsyncProvider(
    options: IMailjetModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass!,
        useClass: options.useClass!,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: IMailjetModuleAsyncOptions
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
      useFactory: async (optionsFactory: IMailjetOptionsFactory) =>
        await optionsFactory.createMailjetOptions(),
      inject: [options.useExisting || options.useClass || ""],
    };
  }
}
