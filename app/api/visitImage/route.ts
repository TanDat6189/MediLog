import { NextResponse } from "next/server";

import { access, unlink } from "fs/promises";
import { constants } from "fs";
import { join } from "path";

import { deleteVisitImage } from "@/server/action/visitImageAction";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await deleteVisitImage(body);

    if (!result) {
      return NextResponse.json(
        { error: "VisitNote not found after delete" },
        { status: 404 }
      );
    }

    const nameImage = body.split("/").pop();

    const tempPath = join(process.cwd(), "public/uploads", nameImage ?? "");

    await access(tempPath, constants.F_OK);
    await unlink(tempPath);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Error has happened" }, { status: 500 });
  }
}
