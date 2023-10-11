import useStore from "@/store/useStore";
import { Action } from "@/types";

class DownloadService {
  public static downloadAll = (actions: any): void => {
    for (let action of actions) {
      !action.is_error && DownloadService.download(action);
    }
  };

  public static download = (action: Action) => {
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
}

export default DownloadService;
