ALTER TABLE "timerProject" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "timerProject" ADD CONSTRAINT "timerProject_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
