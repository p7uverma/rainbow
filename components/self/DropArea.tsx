"use client";

// imports
import { FiUploadCloud } from "react-icons/fi";
import { LuFileSymlink } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import ReactDropzone from "react-dropzone";
import bytesToSize from "@/utils/bytes-to-size";
import fileToIcon from "@/utils/file-to-icon";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import compressFileName from "@/utils/compress-file-name";
import { Skeleton } from "@/components/ui/skeleton";
import { ImSpinner3 } from "react-icons/im";
import { HiOutlineDownload } from "react-icons/hi";
import { Button } from "../ui/button";
import loadFfmpeg from "@/utils/load-ffmpeg";
import type { Action } from "@/types";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { accepted_files, extensions } from "@/lib/utils";
import useStore from "@/store/useStore";
import DownloadService from "@/services/DownloadService";
import ActionContext from "./ActionContext";
import IndicateBadge from "./IndicateBadge";
import { useActionService } from "@/services/useActionService";

export default function Dropzone() {
  // variables & hooks
  const { toast } = useToast();
  const store = useStore();

  const {
    reset,
    handleUpload,
    handleHover,
    handleExitHover,
    downloadAll,
    download,
    checkIsReady,
    deleteAction,
    convertAction,
  } = useActionService(); // Use your custom hook

  const ffmpegRef = useRef<any>(null);

  useEffect(() => {
    console.log(store);
    if (!store.actions.length) {
      store.setIsDone(false);
      store.setFiles([]);
      store.setIsReady(false);
      store.setIsConverting(false);
    } else checkIsReady();
  }, [store.actions]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const ffmpeg_response: FFmpeg = await loadFfmpeg();
    ffmpegRef.current = ffmpeg_response;
    store.setIsLoaded(true);
  };

  // if (!store.isReady) {
  //   return <p>Loading</p>;
  // }

  // returns
  if (store.actions.length) {
    return (
      <div className="space-y-6 m-2">
        {store.actions.map((action: Action, i: any) => (
          <div
            key={i}
            className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between"
          >
            {!store.isLoaded && (
              <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />
            )}
            <div className="flex gap-4 items-center">
              <span className="text-2xl text-orange-600">
                {fileToIcon(action.file_type)}
              </span>
              <div className="flex items-center gap-1 w-96">
                <span className="text-md font-medium overflow-x-hidden">
                  {compressFileName(action.file_name)}
                </span>
                <span className="text-gray-400 text-sm">
                  ({bytesToSize(action.file_size)})
                </span>
              </div>
            </div>

            <IndicateBadge {...action} />
            <ActionContext {...action} />

            {action.is_converting ? (
              <Button variant="outline" onClick={() => download(action)}>
                Download
              </Button>
            ) : (
              <span
                onClick={() => deleteAction(action)}
                className="cursor-pointer hover:bg-primary-foreground transition-colors rounded-full h-10 w-10 flex items-center justify-center text-2xl text-gray-400"
              >
                <MdClose />
              </span>
            )}
          </div>
        ))}
        <div className="flex w-full justify-end">
          {store.isDone ? (
            <div className="space-y-4 w-fit">
              <Button
                size="lg"
                className="rounded-xl font-semibold relative py-4 text-md flex gap-2 items-center w-full"
                onClick={() => downloadAll()}
              >
                {store.actions.length > 1 ? "Download All" : "Download"}
                <HiOutlineDownload />
              </Button>
              <Button
                size="lg"
                onClick={() => reset()}
                variant="outline"
                className="rounded-xl"
              >
                Convert Another File(s)
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              disabled={!store.isReady || store.isConverting}
              className="rounded-xl font-semibold relative py-4 text-md flex items-center w-44"
              onClick={() => convertAction()}
            >
              {store.isConverting ? (
                <span className="animate-spin text-lg">
                  <ImSpinner3 />
                </span>
              ) : (
                <span>Convert Now</span>
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <ReactDropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={accepted_files}
      onDropRejected={() => {
        handleExitHover();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
      onError={() => {
        handleExitHover();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="bg-primary-foreground m-2 w-full h-[30rem] rounded-3xl shadow-sm border-2 border-dashed cursor-pointer flex items-center justify-center"
        >
          <input {...getInputProps()} />
          <div className="space-y-4 text-gray-500">
            {store.isHover ? (
              <>
                <div className="justify-center flex text-6xl">
                  <LuFileSymlink />
                </div>
                <h3 className="text-center font-medium text-2xl">
                  Yes, right there
                </h3>
              </>
            ) : (
              <>
                <div className="justify-center flex text-6xl">
                  <FiUploadCloud />
                </div>
                <h3 className="text-center font-medium text-2xl">
                  Click, or drop your files here
                </h3>
              </>
            )}
          </div>
        </div>
      )}
    </ReactDropzone>
  );
}
