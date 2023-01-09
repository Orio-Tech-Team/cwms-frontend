"use client";

import { Loader } from "@mantine/core";

export default function Loading() {
  return (
    <div className="h-[calc(100vh_-_100px)] w-[100%] flex justify-center items-center">
      <Loader color="dark" size="xl" />
    </div>
  );
}
