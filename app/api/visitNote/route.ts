import { NextResponse } from "next/server";

import {
  getVisitNoteListByHospitalId,
  updateVisitNote,
  createVisitNote,
} from "@/server/action/visitNoteAction";

import { getVisitImageListByVisitNoteId } from "@/server/action/visitImageAction";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const hospitalId = searchParams.get("hospitalId");

  if (!hospitalId) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const visitNoteList = await getVisitNoteListByHospitalId(hospitalId);

  if (!visitNoteList) {
    return NextResponse.json({ error: "VisitNote not found" }, { status: 404 });
  }

  const newVisitNoteList = await Promise.all(
    visitNoteList.map(async (obj) => {
      const visitImageList = await getVisitImageListByVisitNoteId(obj.id);

      if (visitImageList) {
        const newVisitImageList = visitImageList.map((obj) => {
          return obj.imageUrl;
        });
        return {
          ...obj,
          images: newVisitImageList,
        };
      } else {
        return {
          ...obj,
          images: [],
        };
      }
    })
  );

  return NextResponse.json(newVisitNoteList);
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { id, hospitalId, visitDate, notes, createdAt } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const updateData = {
      ...{ hospitalId },
      ...(visitDate && { visitDate }),
      ...(notes && { notes }),
      ...(createdAt && { createdAt }),
    };

    const result = await updateVisitNote(id, updateData);

    if (!result) {
      return NextResponse.json(
        { error: "VisitNote not found after update" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.log("Error Updating VisitNote: ", error);
    return NextResponse.json(
      { error: "Interval Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await createVisitNote(body);

    if (!result) {
      return NextResponse.json(
        { error: "VisitNote not found after create" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Error has happened" }, { status: 500 });
  }
}
