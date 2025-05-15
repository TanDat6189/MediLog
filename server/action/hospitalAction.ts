import { eq } from "drizzle-orm";

import { db } from "../connectDB";
import { hospitals } from "../schema";

export async function getHospitalListById(profileId: string) {
  return await db.query.hospitals.findMany({
    where: eq(hospitals.profileId, profileId),
  });
}

export async function updateHospital(hospitalId: string, updateData: any) {
  return await db
    .update(hospitals)
    .set(updateData)
    .where(eq(hospitals.id, hospitalId))
    .returning();
}

export async function deleteHospital(hospitalId: string) {
  return await db
    .delete(hospitals)
    .where(eq(hospitals.id, hospitalId))
    .returning({ deletedId: hospitals.id });
}

export async function createHospital(data: any) {
  return await db.insert(hospitals).values(data).returning();
}
