import * as schema from "../drizzle/schema";

export type Test = typeof schema.test.$inferSelect;
export type TimerProject = typeof schema.timerProjects.$inferSelect;
export type TimerSession = typeof schema.timerSessions.$inferSelect;
export type User = typeof schema.users.$inferSelect;
export type Account = typeof schema.accounts.$inferSelect;
export type Session = typeof schema.sessions.$inferSelect;