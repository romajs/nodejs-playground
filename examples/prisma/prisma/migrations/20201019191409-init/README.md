# Migration `20201019191409-init`

This migration has been generated by Romualdo Santos at 10/19/2020, 4:14:09 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "address" text   NOT NULL 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201019191248-init..20201019191409-init
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -31,5 +31,7 @@
   id      Int      @default(autoincrement()) @id
   email   String   @unique
   name    String?
   posts   Post[]
+  profile Profile?
+  address String
 }
```

