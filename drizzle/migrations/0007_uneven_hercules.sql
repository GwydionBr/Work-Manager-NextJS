CREATE TABLE IF NOT EXISTS "fixedWorker" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"holidays" integer NOT NULL,
	"workingHoursWeek" integer NOT NULL,
	"dienstPlanId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "relativeWorker" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"workingHoursMonth" integer NOT NULL,
	"dienstPlanId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixedWorker" ADD CONSTRAINT "fixedWorker_dienstPlanId_dienstPlan_id_fk" FOREIGN KEY ("dienstPlanId") REFERENCES "public"."dienstPlan"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relativeWorker" ADD CONSTRAINT "relativeWorker_dienstPlanId_dienstPlan_id_fk" FOREIGN KEY ("dienstPlanId") REFERENCES "public"."dienstPlan"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
