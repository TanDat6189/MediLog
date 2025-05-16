import { NextRequest, NextResponse } from "next/server";
import { writeFile, access } from "fs/promises";
import { constants } from "fs";
import { join } from "path";

import {
  addVisitImage,
  deleteVisitImage,
} from "@/server/action/visitImageAction";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const files = data.getAll("images");
  const noteId = data.get("noteId");

  if (!files || files.length === 0) {
    return NextResponse.json({ success: false, message: "No files uploaded" });
  }

  const saveImages = [];

  for (const file of files) {
    if (!(file instanceof File)) continue;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueFileName = `${Date.now()}-${file.name}`;
    const path = join(process.cwd(), "public/uploads", uniqueFileName);
    await writeFile(path, buffer);

    const relativePath = `/uploads/${uniqueFileName}`;

    const data = {
      noteId,
      imageUrl: relativePath,
    };

    await addVisitImage(data);

    saveImages.push(relativePath);
  }

  return NextResponse.json({
    success: true,
    message: "Upload image successfully",
    data: saveImages,
  });
}
