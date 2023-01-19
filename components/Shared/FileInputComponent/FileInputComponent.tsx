"use client";
import {
  Center,
  FileInput,
  FileInputProps,
  Group,
  MantineSize,
} from "@mantine/core";
import { FaRegImage } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import React from "react";
//
function Value({ file }: { file: File }) {
  return (
    <Center
      inline
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[1],
        fontSize: theme.fontSizes.xs,
        padding: "3px 7px",
        borderRadius: theme.radius.sm,
      })}
    >
      <FaRegImage size={14} style={{ marginRight: 5 }} />
      <span
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          maxWidth: 200,
          display: "inline-block",
        }}
      >
        {file.name}
      </span>
    </Center>
  );
}
//
const ValueComponent: FileInputProps["valueComponent"] = ({ value }) => {
  if (Array.isArray(value)) {
    return (
      <Group spacing="sm" py="xs">
        {value.map((file, index) => (
          <Value file={file} key={index} />
        ))}
      </Group>
    );
  }
  //@ts-ignore
  return <Value file={value} />;
};
//
type Props = {
  size?: MantineSize;
  label: string;
  placeholder: string;
  className?: string;
  required: boolean;
  name: string;
  value: File | null;
  onChange: (value: File) => void;
};
const FileInputComponent = ({
  name,
  size,
  label,
  placeholder,
  className,
  required,
  onChange,
  value,
}: Props) => {
  //

  //
  return (
    <>
      <FileInput
        name={name}
        required={required}
        withAsterisk={required}
        className={className}
        size={size || "md"}
        label={label}
        placeholder={placeholder}
        valueComponent={ValueComponent}
        clearable
        icon={<HiUpload size={14} />}
        onChange={onChange}
        value={value}
        accept={".xlsx,.xlx,.csv,.pdf,.docx,.jpeg,.png"}
      />
    </>
  );
};

export default FileInputComponent;
