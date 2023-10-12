"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeModeSwitch } from "./theme-switch";

export default function Navbar({}): any {
  return (
    <nav className="w-full backdrop-blur-md px-6 bg-opacity-30 z-50 fixed h-24 flex justify-between items-center">
      <Link href="/">
        <Image
          alt="logo"
          className="cursor-pointer"
          src="/images/logo.png"
          height={50}
          width={50}
        />
      </Link>
      <ThemeModeSwitch />
    </nav>
  );
}
