import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type modelType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage";

interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}
interface ModelStore {
  type: modelType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: modelType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModel = create<ModelStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
