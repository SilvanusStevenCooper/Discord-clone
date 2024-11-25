"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Video, VideoOff } from "lucide-react";

import ActionTooltip from "../action-tooltip";
import { useState } from "react";

const ChatVideoButton = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVideo = searchParams?.get("video");

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathName || "",
        query: { video: isVideo ? undefined : true },
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const Icon = isVideo ? VideoOff : Video;
  const toolTipLabel = isVideo ? "End video call" : "Start video call";

  return (
    <ActionTooltip side="bottom" label={toolTipLabel}>
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  );
};

export default ChatVideoButton;
