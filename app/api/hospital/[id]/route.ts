import { NextResponse } from "next/server";

import {
  getHospitalById,
  deleteHospital,
} from "@/server/action/hospitalAction";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const hospitalId = id;

  try {
    if (!hospitalId) {
      return NextResponse.json({ error: "Missing Id" }, { status: 400 });
    }

    const result = await deleteHospital(hospitalId);

    if (!result) {
      return NextResponse.json(
        { error: "Hospital not found after deleting" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
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
