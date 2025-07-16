---
"tonightpass": patch
---

Fix number transformation in ticket DTOs

Add @Transform decorators to price and quantity fields in CreateOrganizationEventTicketDto and UpdateOrganizationEventTicketDto to properly convert string values to numbers during validation.