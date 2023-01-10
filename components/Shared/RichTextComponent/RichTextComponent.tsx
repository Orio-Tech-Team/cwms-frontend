"use client";
import dynamic from "next/dynamic";
import React from "react";
const RichTextEditor = dynamic(() => import("@mantine/rte"), { ssr: false });

type Props = {
  className?: string;
  value: string;
  onChange: (value: any) => void;
};

const RichTextComponent = (props: Props) => {
  return <RichTextEditor aria-placeholder="Enter SKU Description" {...props} />;
};

export default RichTextComponent;
