"use client";
import React from "react";
import Image from "next/image";
//
import { Input, Button } from "@mantine/core";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import NotificationComponent from "../Shared/NotificationComponent/NotificationComponent";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
//
//
type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [notification, setNotification] = React.useState({
    title: "",
    description: "",
    isSuccess: true,
    trigger: false,
  });
  //
  const loginFunction = async (e: any) => {
    e.preventDefault();
    var emailValue = emailRef.current!.value;
    var passwordValue = passwordRef.current!.value;
    if (emailValue === "" || passwordValue === "") {
      setNotification((pre) => {
        return {
          description: "Email Field and Password Field can not be empty!",
          title: "Error",
          isSuccess: false,
          trigger: true,
        };
      });
      return "";
    }
    //
    const response = await axiosFunction({
      urlPath: "/login/",
      method: "POST",
      data: { user_id: emailValue, password: passwordValue },
    });
    //
    if (response.status === 402) {
      setNotification((pre) => {
        return {
          description: "Incorrect Credentials or User Not Found!",
          title: "Error",
          isSuccess: false,
          trigger: true,
        };
      });
      return "";
    }
    //
    setNotification((pre) => {
      return {
        description: "Login In Success Fully",
        title: "Success",
        isSuccess: true,
        trigger: true,
      };
    });

    setCookie("token", response.data.token, { secure: false });
    setCookie("type", response.data.type, { secure: false });
    setCookie("user_id", response.data.user_id, { secure: false });
    setCookie("account_number", response.data.account_number, {
      secure: false,
    });
    return router.push("/dashboard/");
  };
  return (
    <>
      <main className="w-[100%] h-screen flex justify-center items-center select-none">
        <div className="w-[700px] max-w-[95%]">
          <div className="border mx-auto w-[300px] h-[80px]">
            <Image
              src="/pharm_logo.png"
              width={300}
              height={80}
              alt="Pharmacy Logo"
            />
          </div>
          <div className="text-center">
            <h1 className="text-[2rem] font-semibold">Login to your account</h1>
            <p>and let's get those orders moving!</p>
          </div>
          <form
            onSubmit={loginFunction}
            className="flex flex-col gap-5 mt-10 items-end"
          >
            <div className="flex flex-col gap-2 w-[100%]">
              <label className="font-semibold" htmlFor="email_login_input">
                Email
              </label>
              <Input
                ref={emailRef}
                id="email_login_input"
                icon={<MdAlternateEmail />}
                placeholder="Enter your user id"
                size="md"
              />
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <label className="font-semibold" htmlFor="password_login_input">
                password
              </label>
              <Input
                ref={passwordRef}
                id="password_login_input"
                icon={<MdPassword />}
                placeholder="Enter your password"
                size="md"
                type={"password"}
              />
            </div>
            <Button
              disabled={notification.trigger}
              type={"submit"}
              className="bg-blue-500 w-[50%] h-12"
            >
              Sign In
            </Button>
          </form>
        </div>
        <NotificationComponent
          description={notification.description}
          isSuccess={notification.isSuccess}
          title={notification.title}
          trigger={notification.trigger}
          setNotification={setNotification}
        />
      </main>
    </>
  );
};

export default LoginPage;
