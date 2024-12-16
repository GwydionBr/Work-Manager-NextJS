DROP TABLE "earning";--> statement-breakpoint
ALTER TABLE "spending" ADD COLUMN "monthly" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "spending" ADD COLUMN "startDate" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "spending" ADD COLUMN "endDate" timestamp;