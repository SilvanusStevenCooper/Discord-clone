import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { memberRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "General", profileId: profile.id }],
        },

        members: {
          create: [{ profileId: profile.id, role: memberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("Server Creation: Post Request Error", error);
    return new NextResponse("Eternal Error", { status: 500 });
  }
}
