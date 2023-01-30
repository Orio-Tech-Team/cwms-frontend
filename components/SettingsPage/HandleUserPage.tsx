"use client";
import {
  Button,
  PasswordInput,
  Radio,
  Select,
  Switch,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import React from "react";
import useUserData from "../../modules/Users/UseUserData";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
//
function Header() {
  return (
    <div className="mt-5 mb-7 select-none">
      <BreadcrumbComponent />
      <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">Add User</h1>
      <p className="text-gray-500">
        Please see users below from all connected channels
      </p>
    </div>
  );
}
//
function Form() {
  const router = useRouter();
  const { setUserData } = useUserData();
  const submitButtonRef = React.useRef<HTMLButtonElement>(null);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      user_id: "",
      account_number: "",
      user_name: "",
      phone_number: "",
      type: "admin",
      status: false,
      loc_code: "",
    },
  });
  //
  async function submitHandler(data: any) {
    submitButtonRef.current!.disabled = true;
    const response = await axiosFunction({
      urlPath: "/user/register/",
      method: "POST",
      data,
    });
    if (response.status == 500) {
      showNotification({
        title: "Error!",
        message: response.message,
        disallowClose: true,
        autoClose: 3000,
        color: "red",
      });
      submitButtonRef.current!.disabled = false;
      return;
    }
    showNotification({
      title: "Success!",
      message: response.message,
      disallowClose: true,
      autoClose: 3000,
      color: "green",
    });
    setUserData([]);
    setTimeout(() => {
      router.push("/dashboard/settings/users/");
      submitButtonRef.current!.disabled = false;
    }, 3500);
  }
  //
  return (
    <form
      className="p-5 flex gap-5 justify-between flex-wrap"
      onSubmit={form.onSubmit(submitHandler)}
    >
      <Switch
        size="md"
        label="User Status"
        className="w-[100%]"
        description="Active / In-Active"
        {...form.getInputProps("status", {
          type: "checkbox",
        })}
      />
      <Radio.Group
        className="w-[100%]"
        orientation="vertical"
        label="User Type"
        description="Select User Type"
        withAsterisk
        required
        spacing={"xs"}
        {...form.getInputProps("type")}
      >
        <Radio value={"admin"} label={"Admin"} />
        <Radio value={"user"} label={"User"} />
      </Radio.Group>
      <TextInput
        className="w-[47%]"
        placeholder="Enter User Name"
        size="md"
        label="User Name"
        required
        withAsterisk
        type={"text"}
        {...form.getInputProps("user_name")}
      />
      <Select
        className="w-[47%]"
        placeholder="Select Account Number"
        label="Account Number"
        size="md"
        required
        withAsterisk
        data={["KHI-WMS-1000"]}
        {...form.getInputProps("account_number")}
      />
      <TextInput
        className="w-[47%]"
        placeholder="Enter Email"
        size="md"
        label="Email"
        required
        withAsterisk
        type={"email"}
        {...form.getInputProps("email")}
      />
      <TextInput
        className="w-[47%]"
        placeholder="Enter Phone Number"
        size="md"
        label="Phone Number"
        required
        withAsterisk
        type={"text"}
        {...form.getInputProps("phone_number")}
      />
      <TextInput
        className="w-[100%]"
        placeholder="Enter Location Code"
        size="md"
        label="Location Code"
        required
        withAsterisk
        type={"text"}
        {...form.getInputProps("loc_code")}
      />
      <TextInput
        className="w-[47%]"
        placeholder="Enter User ID"
        size="md"
        label="User ID"
        required
        withAsterisk
        type={"text"}
        {...form.getInputProps("user_id")}
      />
      <PasswordInput
        className="w-[47%]"
        placeholder="Enter Password"
        size="md"
        label="Password"
        required
        withAsterisk
        {...form.getInputProps("password")}
      />
      <Button
        ref={submitButtonRef}
        size="md"
        bg={"red"}
        className="bg-red-500 transition-all hover:bg-red-900 ml-auto"
        type={"submit"}
      >
        Register
      </Button>
    </form>
  );
}
//
type Props = {};
const HandleUserPage = (props: Props) => {
  return (
    <section className="flex flex-col justify-center px-5 pb-7">
      <Header />
      <div className="shadow-xl border border-gray-100 rounded-md bg-white">
        <div className="flex justify-between items-center p-5 border-b-[1px]">
          <p className="font-semibold py-2 text-gray-500">
            Here you can manage your all Users!
          </p>
        </div>
        <Form />
      </div>
    </section>
  );
};

export default HandleUserPage;
