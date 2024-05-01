import { isBrowser } from "../../../utils";
import { sdk } from "../../builder";

export const organizationsBilling = sdk((client) => ({
  account: async (slug: string) =>
    client.get("/organizations/:slug/billing/account", { slug }),
  link: (slug: string) => {
    if (isBrowser) {
      window.location.href = client.url("/organizations/:slug/billing/link", {
        slug,
      });
    } else {
      throw new Error("Billing link is only available in the browser");
    }
  },
  dashboard: (slug: string) => {
    if (isBrowser) {
      window.location.href = client.url(
        "/organizations/:slug/billing/dashboard",
        {
          slug,
        },
      );
    } else {
      throw new Error("Billing dashboard is only available in the browser");
    }
  },
}));
