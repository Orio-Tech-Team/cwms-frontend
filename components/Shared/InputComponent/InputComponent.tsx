"use client";
import React from "react";
import { TextInput, MantineSize } from "@mantine/core";

type Props = {
  placeholder?: string;
  size?: MantineSize;
  label?: string;
  type?: string;
  required?: boolean;
};

const InputComponent = ({
  placeholder,
  label,
  size,
  type,
  required,
}: Props) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      size={size || "md"}
      required={required}
      withAsterisk={required}
    />
  );
};

export default InputComponent;
