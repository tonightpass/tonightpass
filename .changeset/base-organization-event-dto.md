---
"tonightpass": patch
---

Add BaseOrganizationEventDto for step-by-step validation

- Add BaseOrganizationEventDto abstract class for event details validation (without tickets)
- Refactor CreateOrganizationEventDto to extend BaseOrganizationEventDto
- Enable separate validation for step 1 (event details) and step 2 (complete event with tickets)
- Fix AtLeastOneMediaConstraint to use BaseOrganizationEventDto type