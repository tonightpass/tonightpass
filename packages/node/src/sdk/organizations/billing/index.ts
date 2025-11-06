import { Client } from "../../../rest";
import { isBrowser } from "../../../utils";

export const organizationsBilling = (client: Client) => ({
  account: async (organizationSlug: string) =>
    client.get("/organizations/@:organizationSlug/billing/account", {
      organizationSlug,
    }),
  link: (organizationSlug: string) => {
    if (isBrowser) {
      window.location.href = client.url(
        "/organizations/@:organizationSlug/billing/link",
        {
          organizationSlug,
        },
      );
    } else {
      throw new Error("Billing link is only available in the browser");
    }
  },
  dashboard: (organizationSlug: string) => {
    if (isBrowser) {
      window.location.href = client.url(
        "/organizations/@:organizationSlug/billing/dashboard",
        {
          organizationSlug,
        },
      );
    } else {
      throw new Error("Billing dashboard is only available in the browser");
    }
  },
});
