import { eq } from "drizzle-orm";

import { db } from "../connectDB";
import { visitImages } from "../schema";

export async function getVisitImageListByVisitNoteId(visitNoteId: string) {
  return await db.query.visitImages.findMany({
    where: eq(visitImages.noteId, visitNoteId),
  });
}

export async function deleteVisitImage(imageUrl: string) {
  return await db
    .delete(visitImages)
    .where(eq(visitImages.imageUrl, imageUrl))
    .returning({ deletedId: visitImages.id });
}

export async function addVisitImage(data: any) {
  await db.insert(visitImages).values(data).returning();
}
