import { NextResponse } from "next/server";

import {
  getHospitalListById,
  updateHospital,
  createHospital,
} from "@/server/action/hospitalAction";

import { getProfileIdByUserId } from "@/server/action/profileAction";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const profileId = await getProfileIdByUserId(userId);
  const hospitalList = await getHospitalListById(profileId);

  if (!hospitalList) {
    return NextResponse.json({ error: "Hospital not found" }, { status: 404 });
  }

  return NextResponse.json(hospitalList);
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, profileId, name, address, hotline } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const updateData = {
      ...{ profileId },
      ...(name && { name }),
      ...(address && { address }),
      ...(hotline && { hotline }),
    };

    const result = await updateHospital(id, updateData);

    if (!result) {
      return NextResponse.json(
        { error: "Profile not found after update" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.log("Error Updating profile: ", error);
    return NextResponse.json(
      { error: "Interval Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id, userId, name, address, hotline } = body;

    const profileId = await getProfileIdByUserId(userId);

    const data = { id, profileId, name, address, hotline };

    const result = await createHospital(data);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Đã có lỗi xảy ra" }, { status: 500 });
  }
}
