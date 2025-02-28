"use client";
import React from "react";
import { toast } from "sonner";
import type { NextPage } from "next";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

const Hello: NextPage = () => {
  return (
    <MaxWidthWrapper>
      <div>
        hello
        <button onClick={() => toast.success("hello")}>toast</button>
      </div>
    </MaxWidthWrapper>
  );
};

export default Hello;
