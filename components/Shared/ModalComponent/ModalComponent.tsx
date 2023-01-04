"use client";
import React from "react";
import { Button } from "@mantine/core";
import { MdCancel } from "react-icons/md";

type Props = {
  modalHandler: () => void;
  modalStatus: boolean;
  children: JSX.Element;
};

const ModalComponent = ({ modalHandler, modalStatus, children }: Props) => {
  return (
    <>
      <div
        className={`fixed w-screen bg-[#000000c6] h-screen z-[999] top-0 left-0 transition-all backdrop-blur flex justify-center items-center overflow-hidden ${
          modalStatus ? "visible" : "invisible"
        }`}
      >
        <div
          className={`flex flex-col bg-white w-[1000px] max-w-[95%] rounded-md p-5  transition-all s ${
            modalStatus ? "scale-100" : "scale-0"
          }`}
        >
          <div className="flex justify-end border-b-2 pb-3 px-3">
            <Button
              onClick={modalHandler}
              compact
              className="bg-transparent text-black text-md flex justify-center items-center hover:bg-transparent w-10 h-10"
            >
              <MdCancel className="text-2xl" />
            </Button>
          </div>
          <div className="pt-3 px-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
