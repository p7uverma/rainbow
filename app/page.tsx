"use client";

import Dropzone from "@/components/self/DropArea";

export default function Home() {
  return (
    <div className="space-y-16">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-5xl font-medium text-center font-mono">
          Free Unlimited File Converter -{" "}
          <span className="text-5xl text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
            Rainbow
          </span>
        </h1>
        <p className="text-gray-400 text-md md:text-lg text-center md:px-24 xl:px-44 2xl:px-52 font-mono">
          Unleash your creativity with{" "}
          <span className="font-bold text-center from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
            Rainbow
          </span>{" "}
          – the ultimate online tool for unlimited and free multimedia
          conversion. Transform images, audio, and videos effortlessly, without
          restrictions. Start converting now and elevate your content like never
          before!
        </p>
      </div>
      <div className="flex justify-center items-center flex-col max-w-[80rem] w-full h-full mx-auto px-4">
        <Dropzone />
      </div>
    </div>
  );
}
