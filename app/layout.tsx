"use client";
import "./globals.css";
import { RecoilRoot } from "recoil";
//
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
