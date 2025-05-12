import { eq } from "drizzle-orm";

import { db } from "../connectDB";
import { hospitals } from "../schema";
import { profiles } from "../schema";

export async function getHospitalListByUserId(userId: string) {
  return await db.query.hospitals.findMany({
    with: {
      profiles: {
        where: (profiles, { eq }) => eq(profiles.userId, userId),
      },
    },
  });
}

export async function updateHospital(hospitalId: string, updateData: any) {
  await db
    .update(hospitals)
    .set(updateData)
    .where(eq(hospitals.id, hospitalId));
}

export async function deleteHospitalById(hospitalId: string) {
  await db.delete(hospitals).where(eq(hospitals.id, hospitalId));
}
