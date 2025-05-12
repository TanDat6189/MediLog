import { NextResponse } from "next/server";
import {
  getProfileById,
  getProfileByUserId,
  updateProfile,
} from "@/server/action/profileAction";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      fullName,
      birthYear,
      hometown,
      height,
      weight,
      bloodType,
      medicalHistory,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing profile ID" },
        { status: 400 }
      );
    }

    const updateData = {
      ...(fullName && { fullName }),
      ...(birthYear && { birthYear }),
      ...(hometown && { hometown }),
      ...(height && { height }),
      ...(weight && { weight }),
      ...(bloodType && { bloodType }),
      ...(medicalHistory && { medicalHistory }),
    };

    await updateProfile(id, updateData);

    const updatedProfile = await getProfileById(id);

    if (!updatedProfile) {
      return NextResponse.json(
        { error: "Profile not found after update" },
        { status: 404 }
      );
    }

    return NextResponse.json({ updatedProfile });
  } catch (error) {
    console.log("Error Updating profile: ", error);
    return NextResponse.json(
      { error: "Interval Server Error" },
      { status: 500 }
    );
  }
}
