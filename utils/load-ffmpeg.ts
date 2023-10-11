import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export default async function loadFfmpeg(): Promise<FFmpeg> {
  // const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
  const baseURL = "/scripts";
  const coreURL = `${baseURL}/ffmpeg-core.js`;
  const wasmURL = `${baseURL}/ffmpeg-core.wasm`;

  const [coreBlob, wasmBlob] = await Promise.all([
    toBlobURL(coreURL, "text/javascript"),
    toBlobURL(wasmURL, "application/wasm"),
  ]);

  const ffmpeg = new FFmpeg();
  await ffmpeg.load({
    coreURL: coreBlob,
    wasmURL: wasmBlob,
  });

  return ffmpeg;
}
