export const runtime = "nodejs";

import { NextResponse } from "next/server";

import { access, unlink } from "fs/promises";
import { constants } from "fs";
import { join } from "path";

import { deleteVisitNote } from "@/server/action/visitNoteAction";
import { getVisitImageListByVisitNoteId } from "@/server/action/visitImageAction";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const visitNoteId = id;

  try {
    if (!visitNoteId) {
      return NextResponse.json({ error: "Missing Id" }, { status: 400 });
    }

    const visitImageList = await getVisitImageListByVisitNoteId(visitNoteId);

    if (!visitImageList) {
      return NextResponse.json(
        { error: `VisitImage not found with visitNoteId: ${visitNoteId}` },
        { status: 404 }
      );
    }

    for (const item of visitImageList) {
      const nameImage = item.imageUrl?.split("/").pop();
      const tempPath = join(process.cwd(), "public/uploads", nameImage ?? "");

      try {
        await access(tempPath, constants.F_OK);
        await unlink(tempPath);
      } catch (err) {
        console.warn(`File not found or cannot delete: ${tempPath}`);
      }
    }

    const returningId = await deleteVisitNote(visitNoteId);

    if (!returningId) {
      return NextResponse.json(
        { error: "Hospital not found after deleting" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: returningId });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete Hospital." },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const hospitalId = params.id;

  try {
    if (!hospitalId) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const hospital = await getHospitalById(hospitalId);

    if (!hospital) {
      return NextResponse.json(
        { error: "Hospital not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hospital);
  } catch (error) {
    console.error("Get data error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to get Hospital." },
      { status: 500 }
    );
  }
}
