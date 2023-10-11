// useActionService.js
import useStore from "@/store/useStore";
import { useRef } from "react";
import FFmpegService from "./FFmpegService";
import { Action } from "@/types";
import convert from "@/utils/convert";
export function useActionService() {
  const store = useStore();
  const ffmpegRef = useRef<any>(null);

  const reset = () => {
    store.setIsDone(false);
    store.setActions([]);
    store.setFiles([]);
    store.setIsReady(false);
    store.setIsConverting(false);
  };

  const updateAction = (file_name: String, to: String) => {
    store.setActions(
      store.actions.map((action) => {
        if (action.file_name === file_name) {
          console.log("FOUND");
          return {
            ...action,
            to,
          };
        }
        return action;
      })
    );
  };

  const handleUpload = (data: Array<any>) => {
    handleExitHover();
    store.setFiles(data);
    const tmp: Action[] = [];
    data.forEach((file) => {
      const formData = new FormData();
      tmp.push({
        file_name: file.name,
        file_size: file.size,
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
        to: null,
        file_type: file.type,
        file,
        is_converted: false,
        is_converting: false,
        is_error: false,
      });
    });
    store.setActions(tmp);
  };

  const handleHover = () => {
    store.setIsHover(true);
  };

  const handleExitHover = () => {
    store.setIsHover(false);
  };

  const checkIsReady = () => {
    let tmp_is_ready = true;
    store.actions.forEach((action) => {
      if (!action.to) tmp_is_ready = false;
    });
    store.setIsReady(tmp_is_ready);
  };

  const deleteAction = (action: Action) => {
    store.setActions(store.actions.filter((elt) => elt !== action));
    store.setFiles(store.files.filter((elt) => elt.name !== action.file_name));
  };

  const convertAction = async () => {
    let tmp_actions = store.actions.map((elt) => ({
      ...elt,
      is_converting: true,
    }));
    store.setActions(tmp_actions);
    store.setIsConverting(true);
    for (let action of tmp_actions) {
      try {
        const { url, output } = await convert(ffmpegRef.current, action);
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: true,
                is_converting: false,
                url,
                output,
              }
            : elt
        );
        store.setActions(tmp_actions);
      } catch (err) {
        console.log(err);
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: false,
                is_converting: false,
                is_error: true,
              }
            : elt
        );
        store.setActions(tmp_actions);
      }
    }
    store.setIsDone(true);
    store.setIsConverting(false);
  };

  const download = (action: Action) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = action.url;
    a.download = action.output;

    document.body.appendChild(a);
    a.click();

    // Clean up after download
    URL.revokeObjectURL(action.url);
    document.body.removeChild(a);
  };
  const downloadAll = (): void => {
    for (let action of store.actions) {
      !action.is_error && download(action);
    }
  };

  return {
    reset,
    updateAction,
    download,
    downloadAll,
    handleUpload,
    handleHover,
    handleExitHover,
    checkIsReady,
    deleteAction,
    convertAction,
  };
}
