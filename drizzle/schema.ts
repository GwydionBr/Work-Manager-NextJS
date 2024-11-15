import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  doublePrecision,
} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccountType } from "next-auth/adapters"
import { relations } from 'drizzle-orm';
 
const connectionString = process.env.POSTGRES_URL!
const pool = postgres(connectionString, { max: 1 })
 
export const db = drizzle(pool)

export const test = pgTable("test", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
})

 
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})
 
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
 
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

export const timerProjects = pgTable("timerProject", {
  id: serial("id").primaryKey(),
  projectName: text("project_name").unique().notNull(),
  projectDescription: text("project_description").notNull(),
  projectSalary: doublePrecision("project_salary").notNull(),
  userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
})

export const usersRelations = relations(users, ({ many }) => ({
  timerProjects: many(timerProjects),
}));


export const timerSessions = pgTable("timerSession", {
  id: serial("id").primaryKey(),
  timeSpent: integer("time_spent").notNull(),
  moneyEarned: doublePrecision("money_earned").notNull(),
  sessionDate: timestamp("session_date", { mode: "date" }).notNull(),
  projectId: integer("project_id")
    .notNull()
    .references(() => timerProjects.id, { onDelete: "cascade" }),
})

export const timerProjectRelations = relations(timerProjects, ({ many }) => ({
  timerSessions: many(timerSessions),
}));

export const dienstPlan = pgTable("dienstPlan", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
})

export const dienstPlanRelations = relations(dienstPlan, ({ many }) => ({
  fixedWorkers: many(fixedWorker),
  relativeWorkers: many(relativeWorker),
}));

export const fixedWorker = pgTable("fixedWorker", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  holidays: integer("holidays").notNull(),
  workingHoursWeek: integer("workingHoursWeek").notNull(),
  dienstPlanId: integer("dienstPlanId")
    .notNull()
    .references(() => dienstPlan.id, { onDelete: "cascade" }),
})

export const fixedWorkerRelations = relations(fixedWorker, ({ one }) => ({
  dienstPlan: one(dienstPlan),
}));

export const relativeWorker = pgTable("relativeWorker", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  workingHoursMonth: integer("workingHoursMonth").notNull(),
  dienstPlanId: integer("dienstPlanId")
    .notNull()
    .references(() => dienstPlan.id, { onDelete: "cascade" }),
})

export const relativeWorkerRelations = relations(relativeWorker, ({ one }) => ({
  dienstPlan: one(dienstPlan),
}));