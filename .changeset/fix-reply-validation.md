---
"tonightpass": patch
---

Fix reply validation in CreateChannelMessageDto

Changed replyToId validation from @IsUUID("4") to @IsMongoId() to match MongoDB ObjectId format used in the database. This fixes the "Validation failed" error when sending reply messages.