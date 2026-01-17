import useSWRSubscription from "swr/subscription";
import {
  DEFAULT_API_URL,
  WebSocketClient,
  type WebSocketEndpoints,
  type WebSocketPaths,
} from "tonightpass";

const WS_PROTOCOL_REGEX = /^http/;

type AnyWebSocketEndpoint = WebSocketEndpoints extends infer T ? T : never;

type ForceAccept<T> = T extends never ? unknown : T;

export type WebSocketOptionsType<Path extends WebSocketPaths> = ForceAccept<
  Extract<AnyWebSocketEndpoint, { path: Path }>["options"]
>;

export type UseWebSocketOptions = {
  maxReconnectAttempts?: number;
  reconnectInterval?: number;
};

export function useWebSocket<Path extends WebSocketPaths>(
  path: Path | null | undefined,
  options?: WebSocketOptionsType<Path>,
  config?: UseWebSocketOptions
) {
  const { data, error } = useSWRSubscription(
    path ? [path, options] : null,
    ([wsPath, wsOptions], { next }) => {
      const client = new WebSocketClient({
        baseURL: DEFAULT_API_URL.replace(WS_PROTOCOL_REGEX, "ws"),
        maxReconnectAttempts: config?.maxReconnectAttempts ?? 3,
        reconnectInterval: config?.reconnectInterval ?? 1000,
      });

      let isConnected = false;

      const connect = async () => {
        try {
          await client.connect(wsPath, wsOptions ?? ({} as any));
          isConnected = true;
        } catch (err) {
          next(err instanceof Error ? err : new Error("Connection failed"));
        }
      };

      client.on("*", (event: unknown) => {
        next(null, { type: "message", data: event });
      });

      // Monitor connection state changes
      const checkConnection = () => {
        const connected = client.connected;
        if (connected && !isConnected) {
          isConnected = true;
          next(null, { type: "connected" });
        } else if (!connected && isConnected) {
          isConnected = false;
          next(null, { type: "disconnected" });
        }
      };

      const connectionInterval = setInterval(checkConnection, 100);

      connect();

      return () => {
        clearInterval(connectionInterval);
        if (isConnected) {
          client.disconnect();
        }
      };
    }
  );

  return {
    data,
    error,
    isConnected: data?.type === "connected",
    isDisconnected: data?.type === "disconnected",
    message: data?.type === "message" ? data.data : null,
  };
}
