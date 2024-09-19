CREATE TABLE IF NOT EXISTS "timerProject" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_name" text NOT NULL,
	"project_description" text NOT NULL,
	"project_salary" integer NOT NULL,
	CONSTRAINT "timerProject_project_name_unique" UNIQUE("project_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "timerSession" (
	"id" serial PRIMARY KEY NOT NULL,
	"time_spent" integer NOT NULL,
	"money_earned" integer NOT NULL,
	"session_date" timestamp NOT NULL,
	"project_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "timerSession" ADD CONSTRAINT "timerSession_project_id_timerProject_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."timerProject"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
