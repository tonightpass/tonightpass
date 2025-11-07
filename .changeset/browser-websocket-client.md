---
"tonightpass": patch
---

Replace Node.js WebSocket client with browser/React Native compatible version

- Remove dependency on `ws` package (Node.js only)
- Use native WebSocket API for browser and React Native compatibility
- Pass authentication token via WebSocket subprotocol (`access_token.*`) instead of custom headers
- Change build platform from "node" to "neutral" for universal compatibility
- Remove React Native specific build files (single universal build)
