import type { SWRSubscriptionOptions } from "swr/subscription";
import useSWRSubscription from "swr/subscription";
import type { PathsFor, Query } from "tonightpass";

import { client, type ResponseType } from "./use-api";

type StreamInner<T> = T extends ReadableStream<infer U> ? U : T;

export type SubscriptionMessageType<Path extends PathsFor<"GET">> = StreamInner<
  ResponseType<Path>
>;

export function useAPISubscription<
  Path extends PathsFor<"GET">,
  TState = SubscriptionMessageType<Path>,
>(
  path: Path | null | undefined,
  query: Query<Path> | undefined,
  onMessage: (
    data: SubscriptionMessageType<Path>,
    next: SWRSubscriptionOptions<TState>["next"]
  ) => void
) {
  const url = path ? client.url(path, query ?? {}) : null;

  const { data, error } = useSWRSubscription(
    url,
    (sseUrl: string, { next }: SWRSubscriptionOptions<TState>) => {
      const eventSource = new EventSource(sseUrl);

      eventSource.onmessage = (event) => {
        try {
          const parsed: SubscriptionMessageType<Path> = JSON.parse(event.data);
          onMessage(parsed, next);
        } catch {
          next(new Error("Failed to parse subscription message"));
        }
      };

      eventSource.onerror = () => {
        next(new Error("Subscription connection error"));
      };

      return () => eventSource.close();
    }
  );

  return { data, error };
}
