"use client";
import React from "react";
//
import { Input, Button, Image } from "@mantine/core";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import NotificationComponent from "../Shared/NotificationComponent/NotificationComponent";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import customNotification from "../../SharedFunctions/CustomNotification";
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
      customNotification({
        message: "Email and Password cannot be empty!",
        title: "Failed",
      });
      return "";
    }
    //
    const response = await axiosFunction({
      urlPath: "/user/login/",
      method: "POST",
      data: { user_id: emailValue, password: passwordValue },
    });

    //
    if (response.status === 404) {
      customNotification({
        message: "Incorrect Credentials or User Not Found!",
        title: "Failed",
      });

      return "";
    }
    //
    customNotification({ message: "Login Successfully", title: "Success" });
    //
    setCookie("token", response.data[0].token, { secure: false });
    setCookie("type", response.data[0].type, { secure: false });
    setCookie("user_id", response.data[0].user_id, { secure: false });
    setCookie("acc_no", response.data[0].acc_no, {
      secure: false,
    });
    setCookie("loc_no", response.data[0].loc_no);
    return router.push("/dashboard/");
  };
  return (
    <>
      <main className="w-[100%] h-screen flex justify-center items-center select-none">
        <div className="w-[700px] max-w-[95%]">
          <div className="mx-auto w-[300px] flex justify-center items-center">
            <Image src={process.env.LOGO_URL || ""} alt="Pharmacy Logo" />
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
