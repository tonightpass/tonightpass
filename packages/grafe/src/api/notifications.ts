import { REST } from "../REST";
import { APIResponse } from "../types/api-response";
import { SUBSCRIBE_NEWSLETTER } from "./store/subscribe-newsletter.query";

export class NotificationsAPI {
  public constructor(private readonly rest: REST) {}

  public async subscribeNewsletter(email: string): Promise<APIResponse> {
    return await this.rest.mutate(SUBSCRIBE_NEWSLETTER, { email });
  }
}
