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
    setTimeout(() => {
      setNotification((pre: any) => {
        return {
          ...pre,
          trigger: false,
        };
      });
    }, 4000);
  }, [trigger]);
  //
  return (
    <Notification
      className={`fixed right-5 bottom-5 z-[999] shadow-xl min-w-[250px] transition-all ${
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
