import React from "react";
//
import { Notification } from "@mantine/core";

import { BiCheck } from "react-icons/bi";
import { MdClose } from "react-icons/md";
//
type Props = {
  title: string;
  description: string;
  isSuccess: boolean;
  trigger: boolean;
  setNotification: (value: any) => void;
};

const NotificationComponent = ({
  title,
  description,
  isSuccess,
  trigger,
  setNotification,
}: Props) => {
  //
  React.useEffect(() => {
    if (trigger) {
      setTimeout(() => {
        setNotification((pre: any) => {
          return {
            ...pre,
            trigger: false,
          };
        });
      }, 4000);
    }
  }, [trigger]);
  //
  return (
    <Notification
      className={`fixed right-28 bottom-8 z-[999] shadow-2xl min-w-[250px] scale-150 transition-all ${
        !trigger && "translate-x-[1000px]"
      }`}
      icon={isSuccess ? <BiCheck /> : <MdClose />}
      color={isSuccess ? "teal" : "red"}
      title={title}
      disallowClose
    >
      {description}
    </Notification>
  );
};

export default NotificationComponent;
