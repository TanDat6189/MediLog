import { eq } from "drizzle-orm";

import { db } from "../connectDB";
import { profiles } from "../schema";

enum BloodTypeEnum {
  A = "A",
  B = "B",
  AB = "AB",
  O = "O",
  Unknown = "unknown",
}

export async function createProfile(
  userId: string,
  fullName: string,
  birthYear: number,
  hometown: string,
  height: number,
  weight: number,
  bloodType: BloodTypeEnum,
  medicalHistory: string
) {
  return await db.insert(profiles).values({
    userId,
    fullName,
    birthYear,
    hometown,
    height,
    weight,
    bloodType,
    medicalHistory,
  });
}

export async function getProfile(userId: string) {
  return await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });
}
