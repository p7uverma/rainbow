import { Action } from "@/types";
import { create } from "zustand";

type State = {
  isHover: boolean;
  actions: Action[];
  isReady: boolean;
  files: any[];
  isLoaded: boolean;
  isConverting: boolean;
  isDone: boolean;
  defaultValues: string;
  selcted: string;

  setIsHover: (hover: boolean) => void;
  setActions: (actions: Action[]) => void;
  setIsReady: (ready: boolean) => void;
  setFiles: (files: any[]) => void;
  setIsLoaded: (loaded: boolean) => void;
  setIsConverting: (converting: boolean) => void;
  setIsDone: (done: boolean) => void;
  setDefaultValues: (values: string) => void;
  setSelected: (selected: string) => void;
};

const useStore = create<State>((set) => ({
  isHover: false,
  actions: [],
  isReady: false,
  files: [],
  isLoaded: false,
  isConverting: false,
  isDone: false,
  defaultValues: "video",
  selcted: "...",

  setIsHover: (isHover) => set({ isHover }),
  setActions: (actions) => set({ actions }),
  setIsReady: (isReady) => set({ isReady }),
  setFiles: (files) => set({ files }),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  setIsConverting: (isConverting) => set({ isConverting }),
  setIsDone: (isDone) => set({ isDone }),
  setDefaultValues: (defaultValues) => set({ defaultValues }),
  setSelected: (selected) => set({ selcted: selected }),
}));

export default useStore;
