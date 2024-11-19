ALTER TABLE "wg" DROP CONSTRAINT "wg_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "wg" DROP COLUMN IF EXISTS "userId";