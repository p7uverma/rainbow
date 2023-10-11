"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Action } from "@/types";
import useStore from "@/store/useStore";
import { extensions } from "@/lib/utils";
import { useActionService } from "@/services/useActionService";

const ActionContext = (action: Action) => {
  const store = useStore();

  const { updateAction } = useActionService(); // Use your custom hook

  if (!action.is_converted) {
    return (
      <div className="text-gray-400 text-md flex items-center gap-4 px-1">
        <span>Convert to</span>
        <Select
          onValueChange={(value) => {
            if (extensions.audio.includes(value)) {
              store.setDefaultValues("audio");
            } else if (extensions.video.includes(value)) {
              store.setDefaultValues("video");
            }
            store.setSelected(value);
            updateAction(action.file_name, value);
          }}
          value={store.selcted}
        >
          <SelectTrigger className="w-32 outline-none focus:outline-none focus:ring-0 text-center text-md font-medium">
            <SelectValue placeholder="Select Format" />
          </SelectTrigger>
          <SelectContent className="h-fit">
            {action.file_type.includes("image") && (
              <div className="grid grid-cols-2 gap-2 w-fit">
                {extensions.image.map((elt, i) => (
                  <div key={i} className="col-span-1 text-center">
                    <SelectItem value={elt} className="mx-auto">
                      {elt}
                    </SelectItem>
                  </div>
                ))}
              </div>
            )}
            {action.file_type.includes("video") && (
              <Tabs defaultValue={store.defaultValues} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="video" className="w-full">
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="audio" className="w-full">
                    Audio
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="video">
                  <div className="grid grid-cols-3 gap-2 w-fit">
                    {extensions.video.map((elt, i) => (
                      <div key={i} className="col-span-1 text-center">
                        <SelectItem value={elt} className="mx-auto">
                          {elt}
                        </SelectItem>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="audio">
                  <div className="grid grid-cols-3 gap-2 w-fit">
                    {extensions.audio.map((elt, i) => (
                      <div key={i} className="col-span-1 text-center">
                        <SelectItem value={elt} className="mx-auto">
                          {elt}
                        </SelectItem>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
            {action.file_type.includes("audio") && (
              <div className="grid grid-cols-2 gap-2 w-fit">
                {extensions.audio.map((elt, i) => (
                  <div key={i} className="col-span-1 text-center">
                    <SelectItem value={elt} className="mx-auto">
                      {elt}
                    </SelectItem>
                  </div>
                ))}
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
    );
  }
  return null;
};

export default ActionContext;
