---
"tonightpass": minor
---

Add removing an event interest

The heart in the feed could only ever be pressed, never unpressed, because
the only route was a POST that records. A DELETE on the same path takes it
back, matched on the account when there is one and on the session cookie
otherwise, exactly as recording does.
