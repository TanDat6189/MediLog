import { eq } from "drizzle-orm";

import { db } from "../connectDB";
import { visitNotes } from "../schema";

export async function getVisitNoteListByHospitalId(hospitalId: string) {
  return await db.query.visitNotes.findMany({
    where: eq(visitNotes.hospitalId, hospitalId),
  });
}

export async function updateVisitNote(id: string, updateData: any) {
  return await db
    .update(visitNotes)
    .set(updateData)
    .where(eq(visitNotes.id, id))
    .returning();
}

export async function deleteVisitNote(id: string) {
  return await db
    .delete(visitNotes)
    .where(eq(visitNotes.id, id))
    .returning({ deletedId: visitNotes.id });
}

export async function createVisitNote(data: any) {
  return await db.insert(visitNotes).values(data).returning();
}
