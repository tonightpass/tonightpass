import { loader } from "fumadocs-core/source";

import { docs, apiReference } from "@/.source";

export const docsSource = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const apiReferenceSource = loader({
  baseUrl: "/api-reference",
  source: apiReference.toFumadocsSource(),
});
