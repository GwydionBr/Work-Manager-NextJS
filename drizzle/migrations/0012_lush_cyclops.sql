CREATE TABLE IF NOT EXISTS "payout" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" double precision NOT NULL,
	"date" timestamp NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payout" ADD CONSTRAINT "payout_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
