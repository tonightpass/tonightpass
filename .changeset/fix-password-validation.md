---
"tonightpass": patch
---

Fix password validation consistency in UpdateUserDto

Add missing password complexity validation rules to UpdateUserDto to match CreateUserDto security requirements. Now both DTOs enforce the same password rules: minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number or special character.