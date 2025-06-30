---
"tonightpass": patch
---

Add RecoveryResponse type for password recovery endpoint

Added new `RecoveryResponse` interface to provide feedback about where the recovery email/SMS was sent. The response includes a `to` field that contains the masked destination (e.g., "joh***@gmail.com" or "+33 6 ** ** 99 99") to inform users where their recovery message was delivered while maintaining privacy.