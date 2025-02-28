"use client";
import React from "react";
import { toast } from "sonner";
import type { NextPage } from "next";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Hello: NextPage = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        hello
        <button onClick={() => toast.success("hello")}>toast</button>
      </div>
    </MaxWidthWrapper>
  );
};

export default Hello;
