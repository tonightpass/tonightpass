---
"tonightpass": patch
---

Add Invoice type extension for Stripe Connect compatibility

Extends the base Invoice type with additional properties needed for TonightPass Stripe Connect integration:
- `payment_intent?: string | Stripe.PaymentIntent` - Expanded payment intent reference
- `client_secret?: string` - Client secret for frontend payment processing  
- `confirmation_secret?: string` - String-based confirmation secret for frontend compatibility

This change improves type safety while maintaining compatibility with the existing payment system that expects `confirmation_secret` as a string rather than Stripe's default object structure.