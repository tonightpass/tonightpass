import { pathcat } from "pathcat";
import WebSocket from "ws";

import { WebSocketPaths, WebSocketOptionsFor } from "../endpoints";
import { WebSocketClientOptions, ChannelWebSocketEvent } from "../types";

export type WebSocketEventHandler<T> = (event: T) => void;

type EventHandlerMap = Map<
  string,
  Set<WebSocketEventHandler<ChannelWebSocketEvent>>
>;

export class WebSocketClient {
  private ws?: WebSocket;
  private options: WebSocketClientOptions;
  private reconnectAttempts = 0;
  private reconnectTimer?: NodeJS.Timeout;
  private eventHandlers: EventHandlerMap = new Map();
  private isConnected = false;
  private isReconnecting = false;

  constructor(options: Partial<WebSocketClientOptions> = {}) {
    this.options = {
      baseURL: "wss://api.tonightpass.com",
      maxReconnectAttempts: 3,
      reconnectInterval: 1000,
      debug: false,
      ...options,
    };
  }

  private log(message: string, ...args: unknown[]) {
    if (this.options.debug) {
      console.log(`[WebSocketClient] ${message}`, ...args);
    }
  }

  private getWebSocketURL<P extends WebSocketPaths>(
    path: P,
    options: WebSocketOptionsFor<P>,
  ): string {
    // Extract parameters for pathcat - only string values for path parameters
    const pathParams: Record<string, string> = {};
    Object.entries(options).forEach(([key, value]) => {
      if (typeof value === "string" && key !== "token") {
        pathParams[key] = value;
      }
    });

    const fullPath = pathcat(path, pathParams);
    return `${this.options.baseURL}${fullPath}`;
  }

  async connect<P extends WebSocketPaths>(
    path: P,
    options: WebSocketOptionsFor<P>,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const url = this.getWebSocketURL(path, options);
        this.log("Connecting to", url);

        const headers: Record<string, string> = {};

        // Type guard to check if options has token property
        if ("token" in options && typeof options.token === "string") {
          headers.Authorization = `Bearer ${options.token}`;
        }

        this.ws = new WebSocket(url, { headers });

        this.ws.on("open", () => {
          this.log("Connected successfully");
          this.isConnected = true;
          this.isReconnecting = false;
          this.reconnectAttempts = 0;
          resolve();
        });

        this.ws.on("message", (data) => {
          try {
            const event = JSON.parse(data.toString());
            this.handleEvent(event);
          } catch (error) {
            this.log("Error parsing message:", error);
          }
        });

        this.ws.on("close", (code) => {
          this.log("Connection closed", code);
          this.isConnected = false;

          if (this.options.maxReconnectAttempts && !this.isReconnecting) {
            this.handleReconnect(path, options);
          }
        });

        this.ws.on("error", (error) => {
          this.log("WebSocket error:", error);
          this.isConnected = false;
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleReconnect<P extends WebSocketPaths>(
    path: P,
    options: WebSocketOptionsFor<P>,
  ) {
    if (this.reconnectAttempts >= this.options.maxReconnectAttempts!) {
      this.log("Max reconnect attempts reached");
      return;
    }

    this.isReconnecting = true;
    this.reconnectAttempts++;

    this.log(
      `Attempting to reconnect (${this.reconnectAttempts}/${this.options.maxReconnectAttempts})`,
    );

    this.reconnectTimer = setTimeout(() => {
      this.connect(path, options).catch((error) => {
        this.log("Reconnection failed:", error);
      });
    }, this.options.reconnectInterval);
  }

  private handleEvent(event: ChannelWebSocketEvent) {
    this.log("Received event:", event.type);

    // Call handlers for this specific event type
    const typeHandlers = this.eventHandlers.get(event.type);
    if (typeHandlers) {
      typeHandlers.forEach((handler) => handler(event));
    }

    // Call wildcard handlers
    const wildcardHandlers = this.eventHandlers.get("*");
    if (wildcardHandlers) {
      wildcardHandlers.forEach((handler) => handler(event));
    }
  }

  on<T extends ChannelWebSocketEvent>(
    eventType: T["type"] | "*",
    handler: WebSocketEventHandler<T>,
  ): () => void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, new Set());
    }

    // Create a type-safe wrapper that accepts any ChannelWebSocketEvent
    const wrappedHandler: WebSocketEventHandler<ChannelWebSocketEvent> = (
      event,
    ) => {
      // The event will be properly typed based on the eventType
      handler(event as T);
    };

    this.eventHandlers.get(eventType)!.add(wrappedHandler);

    // Return unsubscribe function
    return () => {
      const handlers = this.eventHandlers.get(eventType);
      if (handlers) {
        handlers.delete(wrappedHandler);
        if (handlers.size === 0) {
          this.eventHandlers.delete(eventType);
        }
      }
    };
  }

  off<T extends ChannelWebSocketEvent>(
    eventType: T["type"] | "*",
    _handler: WebSocketEventHandler<T>,
  ): void {
    // Note: This is a simplified version that clears all handlers for the event type
    // For exact handler removal, we'd need to maintain a mapping
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      handlers.clear();
      this.eventHandlers.delete(eventType);
    }
  }

  send(data: unknown): void {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify(data));
    } else {
      this.log("Cannot send data: WebSocket not connected");
    }
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    if (this.ws) {
      this.isConnected = false;
      this.isReconnecting = false;
      this.ws.close();
    }

    this.eventHandlers.clear();
  }

  get connected(): boolean {
    return this.isConnected;
  }

  get reconnecting(): boolean {
    return this.isReconnecting;
  }
}

// Note: Channels client is imported separately to avoid circular dependency
