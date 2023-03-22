import { REST } from "../REST";
import { SUBSCRIBE_NEWSLETTER } from "./store/subscribe-newsletter.query";

export class NotificationsAPI {
  public constructor(private readonly rest: REST) {}

  public async subscribeNewsletter(email: string): Promise<void> {
    return await this.rest.mutate(SUBSCRIBE_NEWSLETTER, { email });
  }
}
