import { NextResponse } from "next/server";

import { deleteHospital } from "@/server/action/hospitalAction";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const hospitalId = params.id;

  try {
    if (!hospitalId) {
      return NextResponse.json({ error: "Missing Id" }, { status: 400 });
    }

    const result = await deleteHospital(hospitalId);

    if (!result) {
      return NextResponse.json(
        { error: "Profile not found after deleting" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete user." },
      { status: 500 }
    );
  }
}
