import * as schema from "drizzle/schema";

export type Test = typeof schema.test.$inferSelect;
export type TimerProject = typeof schema.timerProjects.$inferSelect;
export type TimerSession = typeof schema.timerSessions.$inferSelect;
export type Spending = typeof schema.spendings.$inferSelect;
export type User = typeof schema.users.$inferSelect;
export type Account = typeof schema.accounts.$inferSelect;
export type Session = typeof schema.sessions.$inferSelect;
export type Wg = typeof schema.wg.$inferSelect;
export type WgUser = typeof schema.wgMember.$inferSelect;
export type WgTask = typeof schema.wgTask.$inferSelect;


export interface ServerOutput {
  success: boolean;
  data?: any;
  errors?: {
    message?: string[];
  };
}