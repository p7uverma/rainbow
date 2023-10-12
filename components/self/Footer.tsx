"use client";

import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <span className="mr-4">
            <Link className={buttonVariants({ variant: "link" })} href="/about">
              About
            </Link>
          </span>
          <span className="mr-4">
            <Link
              className={buttonVariants({ variant: "link" })}
              href="/legal/privacy-policy"
            >
              Privacy Policy
            </Link>
          </span>

          <span className="mr-4">
            <Link
              className={buttonVariants({ variant: "link" })}
              href="/contact"
            >
              Contact Us
            </Link>
          </span>
        </div>
        <div>
          <p>
            &copy; 2023{" "}
            <Link
              href={"https://p7u.tech"}
              className={cn(buttonVariants({ variant: "link" }), "px-0 mr-1")}
            >
              P7u.tech.
            </Link>
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
