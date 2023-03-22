import { REST } from "../REST";
import { SUBSCRIBE_TO_NEWSLETTER } from "./store/notifications/subscribe-newsletter.query";
import { UNSUBSCRIBE_FROM_NEWSLETTER } from "./store/notifications/unsubscribe-newsletter.query";

export class NotificationsAPI {
  public constructor(private readonly rest: REST) {}

  public async subscribeToNewsletter(email: string): Promise<boolean> {
    return await this.rest.mutate<boolean>(SUBSCRIBE_TO_NEWSLETTER, { email });
  }

  public async unsubscribeFromNewsletter(
    email: string,
    reason: string
  ): Promise<boolean> {
    return await this.rest.mutate<boolean>(UNSUBSCRIBE_FROM_NEWSLETTER, {
      email,
      reason,
    });
  }
}
