"use client";
import "./globals.css";
import { RecoilRoot } from "recoil";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
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
        <MantineProvider withNormalizeCSS withGlobalStyles>
          <NotificationsProvider>
            <RecoilRoot>{children}</RecoilRoot>
          </NotificationsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
