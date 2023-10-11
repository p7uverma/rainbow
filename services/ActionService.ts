// import useStore from "@/store/useStore";
// import FFmpegService from "./FFmpegService";
// import { useRef } from "react";
// import { Action } from "@/types";

// class ActionService {
//   private static store = useStore();
//   private static ffmpegRef = useRef<any>(null);

//   public static reset = () => {
//     ActionService.store.setIsDone(false);
//     ActionService.store.setActions([]);
//     ActionService.store.setFiles([]);
//     ActionService.store.setIsReady(false);
//     ActionService.store.setIsConverting(false);
//   };

//   public static updateAction = (file_name: String, to: String) => {
//     ActionService.store.setActions(
//       ActionService.store.actions.map((action): Action => {
//         if (action.file_name === file_name) {
//           console.log("FOUND");
//           return {
//             ...action,
//             to,
//           };
//         }

//         return action;
//       })
//     );
//   };

//   public static handleUpload = (data: Array<any>): void => {
//     ActionService.handleExitHover();
//     ActionService.store.setFiles(data);
//     const tmp: Action[] = [];
//     data.forEach((file: any) => {
//       const formData = new FormData();
//       tmp.push({
//         file_name: file.name,
//         file_size: file.size,
//         from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
//         to: null,
//         file_type: file.type,
//         file,
//         is_converted: false,
//         is_converting: false,
//         is_error: false,
//       });
//     });
//     ActionService.store.setActions(tmp);
//   };
//   public static handleHover = (): void => ActionService.store.setIsHover(true);
//   public static handleExitHover = (): void =>
//     ActionService.store.setIsHover(false);

//   public static checkIsReady = (): void => {
//     let tmp_is_ready = true;
//     ActionService.store.actions.forEach((action: Action) => {
//       if (!action.to) tmp_is_ready = false;
//     });
//     ActionService.store.setIsReady(tmp_is_ready);
//   };
//   public static deleteAction = (action: Action): void => {
//     ActionService.store.setActions(
//       ActionService.store.actions.filter((elt) => elt !== action)
//     );
//     ActionService.store.setFiles(
//       ActionService.store.files.filter((elt) => elt.name !== action.file_name)
//     );
//   };

//   public static async convertAction() {
//     let tmp_actions = ActionService.store.actions.map((elt) => ({
//       ...elt,
//       is_converting: true,
//     }));
//     ActionService.store.setActions(tmp_actions);
//     ActionService.store.setIsConverting(true);
//     for (let action of tmp_actions) {
//       try {
//         const { url, output } = await FFmpegService.convert(
//           ActionService.ffmpegRef.current,
//           action
//         );
//         tmp_actions = tmp_actions.map((elt) =>
//           elt === action
//             ? {
//                 ...elt,
//                 is_converted: true,
//                 is_converting: false,
//                 url,
//                 output,
//               }
//             : elt
//         );
//         ActionService.store.setActions(tmp_actions);
//       } catch (err) {
//         tmp_actions = tmp_actions.map((elt) =>
//           elt === action
//             ? {
//                 ...elt,
//                 is_converted: false,
//                 is_converting: false,
//                 is_error: true,
//               }
//             : elt
//         );
//         ActionService.store.setActions(tmp_actions);
//       }
//     }
//     ActionService.store.setIsDone(true);
//     ActionService.store.setIsConverting(false);
//   }
// }

// export default ActionService;
