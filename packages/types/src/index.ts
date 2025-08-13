// Shared zod types and enums
import { z } from "zod";

export const YearGroup = z.enum(["Y7","Y8","Y9","Y10","Y11","Y12"]);
export type YearGroup = z.infer<typeof YearGroup>;

export const AchievementLevel = z.enum(["BRONZE","SILVER","GOLD","PLATINUM"]);
export type AchievementLevel = z.infer<typeof AchievementLevel>;

export const SentimentFlag = z.enum(["OK","CHECK_IN","CONCERN"]);
export type SentimentFlag = z.infer<typeof SentimentFlag>;

export const ActivitySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().min(2),
  date: z.string(), // ISO
  location: z.string().optional(),
  yearGroups: z.array(YearGroup),
  points: z.number().int().nonnegative(),
  createdById: z.string().uuid()
});

export const SubmissionSchema = z.object({
  id: z.string().uuid(),
  activityId: z.string().uuid(),
  studentId: z.string().uuid(),
  dateCompleted: z.string(),
  minutesSpent: z.number().int().nonnegative(),
  reflection: z.string().min(3),
  proofUrl: z.string().url().optional(),
  status: z.enum(["PENDING","APPROVED","REJECTED"]),
  sentiment: SentimentFlag.optional()
});
