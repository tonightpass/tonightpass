import { createFromSource } from "fumadocs-core/search/server";
import { NextRequest } from "next/server";

import { docsSource, apiReferenceSource } from "@/lib/source";

const docsSearch = createFromSource(docsSource);
const apiSearch = createFromSource(apiReferenceSource);

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const locale = url.searchParams.get("locale") || undefined;
  const tag = url.searchParams.get("tag") || undefined;

  if (!query) {
    return new Response(JSON.stringify([]), {
      headers: { "content-type": "application/json" },
    });
  }

  const [docsResults, apiResults] = await Promise.all([
    docsSearch.search(query, { locale, tag }),
    apiSearch.search(query, { locale, tag }),
  ]);

  const combinedResults = [...docsResults, ...apiResults];

  return new Response(JSON.stringify(combinedResults), {
    headers: { "content-type": "application/json" },
  });
}
