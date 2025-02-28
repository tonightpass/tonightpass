import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

import { baseOptions } from "@/app/layout.config";
import { apiReferenceSource } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={apiReferenceSource.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
