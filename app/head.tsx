"use client";
import { usePathname } from "next/navigation";
export default function Head() {
  const router = usePathname();
  const linkPath = router!.split("/");
  //
  return (
    <>
      <title className="capitalize">
        {router != "" ? linkPath[linkPath.length - 1] : "Login"}
      </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
