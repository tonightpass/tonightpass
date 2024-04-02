import { Controller } from "@nestjs/common";
import { Get } from "@tonightpass/nest";

import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health/http")
  getHello(): string {
    return this.appService.getHello();
  }
}
