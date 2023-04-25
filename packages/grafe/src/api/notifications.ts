import { REST } from "../REST";
import { APIResponse } from "../types/api-response";
import { SUBSCRIBE_TO_NEWSLETTER } from "./store/notifications/subscribe-newsletter.query";
import { UNSUBSCRIBE_FROM_NEWSLETTER } from "./store/notifications/unsubscribe-newsletter.query";

export class NotificationsAPI {
  public constructor(private readonly rest: REST) {}

  public async subscribeToNewsletter(
    userEmail: string
  ): Promise<APIResponse<boolean>> {
    const result = await this.rest.mutate(SUBSCRIBE_TO_NEWSLETTER, {
      userEmail,
    });

    if (!result.success) {
      return [null, result.error];
    }

    return [result.data.subscribeToNewsletter, null];
  }

  public async unsubscribeFromNewsletter(
    userEmail: string,
    reason: string
  ): Promise<APIResponse<boolean>> {
    const result = await this.rest.mutate(UNSUBSCRIBE_FROM_NEWSLETTER, {
      userEmail,
      reason,
    });

    if (!result.success) {
      return [null, result.error];
    }

    return [result.data.unsubscribeFromNewsletter, null];
  }
}
