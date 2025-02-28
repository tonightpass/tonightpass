// src/app/layout.config.tsx
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 * API Reference Layout: app/api-reference/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <svg
          width={"24"}
          height={"24"}
          xmlns={"http://www.w3.org/2000/svg"}
          aria-label={"TonightPass Logo"}
        >
          <circle cx={12} cy={12} r={12} fill={"currentColor"} />
        </svg>
        {"TonightPass"}
      </>
    ),
  },
  links: [
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url",
    },
    {
      text: "API Reference",
      url: "/api-reference",
      active: "nested-url",
    },
    {
      text: "GitHub",
      url: "https://github.com/tonightpass/tonightpass",
      external: true,
    },
  ],
};
