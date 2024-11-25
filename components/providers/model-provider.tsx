"use client";

import React, { useEffect, useState } from "react";
import CreateServerModel from "@/components/modles/create-server-model";
import InviteModel from "@/components/modles/invite-modle";
import EditServerModel from "@/components/modles/edit-server-model";
import MembersModel from "@/components/modles/members-modle";
import CreateChannelModel from "@/components/modles/create-channel-modle";
import LeaveServerModle from "@/components/modles/leave-server-modle";
import DeleteSereverModle from "../modles/delete-server-modle";
import DeleteChannelModle from "../modles/delete-channel-modle";
import EditChannelModel from "../modles/edit-channel-modle";
import MessageFileModel from "../modles/message-file-model";
import DeleteMessageModle from "../modles/delete-message-modle";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModel />
      <InviteModel />
      <EditServerModel />
      <MembersModel />
      <CreateChannelModel />
      <LeaveServerModle />
      <DeleteSereverModle />
      <DeleteChannelModle />
      <EditChannelModel />
      <MessageFileModel />
      <DeleteMessageModle />
    </>
  );
};

export default ModelProvider;
