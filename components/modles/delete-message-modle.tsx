"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import qs from "query-string";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useModel } from "@/hooks/use-model-store";
import { Label } from "../ui/label";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const DeleteMessageModle = () => {
  const { onOpen, isOpen, onClose, type, data } = useModel();

  const isModelOpen = isOpen && type === "deleteMessage";
  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query: query,
      });

      await axios.delete(url);
      onClose();
    } catch (error) {
      console.log("There is an error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent
        className="
      bg-white text-black p-0 overflow-hidden
      "
      >
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center text-rose-700 font-bold">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            This message will be permanently deleted!!!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 ppx-6 py-4">
          <div className="flex items-center justify-between w-full px-4">
            <Button disabled={isLoading} onClick={onClose} variant={"ghost"}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onConfirm}
              className="bg-rose-700 text-white hover:bg-rose-600"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMessageModle;
