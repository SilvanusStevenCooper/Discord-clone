import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";

const messages_batch = 10;

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    let messages: Message[] = [];

    if (cursor) {
      messages = await db.message.findMany({
        take: messages_batch,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId: channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await db.message.findMany({
        take: messages_batch,
        where: {
          channelId: channelId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if (messages.length === messages_batch) {
      nextCursor = messages[messages_batch - 1].id;
    }

    return NextResponse.json({
      items: messages,
      nextCursor: nextCursor,
    });
  } catch (error) {
    console.log("MESSAGE_GET ERROR: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
