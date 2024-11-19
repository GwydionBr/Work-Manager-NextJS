CREATE TABLE IF NOT EXISTS "wg" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wgMember" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"wgId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wgTask" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"wgId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wg" ADD CONSTRAINT "wg_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wgMember" ADD CONSTRAINT "wgMember_wgId_wg_id_fk" FOREIGN KEY ("wgId") REFERENCES "public"."wg"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wgTask" ADD CONSTRAINT "wgTask_wgId_wg_id_fk" FOREIGN KEY ("wgId") REFERENCES "public"."wg"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
