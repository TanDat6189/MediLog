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

export async function getProfileIdByUserId(userId: string) {
  const result = await db
    .select({
      field1: profiles.id,
    })
    .from(profiles)
    .where(eq(profiles.userId, userId));

  const { field1 } = result[0];
  return field1;
}

export async function getProfileById(Id: string) {
  return await db.query.profiles.findFirst({
    where: eq(profiles.id, Id),
  });
}

export async function getProfileByUserId(userId: string) {
  return await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });
}

export async function updateProfile(profileId: string, updateData: any) {
  await db.update(profiles).set(updateData).where(eq(profiles.id, profileId));
}
