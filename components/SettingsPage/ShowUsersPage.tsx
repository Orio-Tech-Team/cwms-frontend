"use client";
import Link from "next/link";
//
import React from "react";
import useUserData from "../../modules/Users/UseUserData";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";
//
const Header = () => (
  <>
    <div className="mt-5 mb-7">
      <BreadcrumbComponent />
      <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">Users</h1>
      <p className="text-gray-500">
        Please see users below from all connected channels
      </p>
    </div>
  </>
);
//
const Table: React.FC = () => {
  const { userData, setUserData } = useUserData();
  return (
    <>
      <div>
        <DataTableComponent
          columns={[
            {
              name: "ID",
              selector: (row: any) => row.id,
              grow: 0,
              center: true,
              width: "66px",
            },
            {
              name: "User Name",
              selector: (row: any) => row.user_name,
              grow: 1,
              sortable: true,
            },
            {
              name: "Account Number",
              selector: (row: any) => row.account_number,
              grow: 0,
              width: "190px",
            },
            {
              name: "Phone Number",
              selector: (row: any) =>
                row.phone_number == "" ? "-" : row.phone_number,
              grow: 0,
              center: true,
              width: "190px",
            },
            {
              name: "Email",
              selector: (row: any) => row.email,
              grow: 0,
              center: true,
              width: "190px",
            },
            {
              name: "Status",
              selector: (row: any) => (
                <span
                  className={`font-semibold ${
                    row.status ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {row.status ? "Active" : "In-Active"}
                </span>
              ),
              grow: 0,
              width: "100px",
              center: true,
            },
          ]}
          data={userData}
        />
      </div>
    </>
  );
};
//
type Props = {};
const ShowUsersPage = (props: Props) => {
  return (
    <>
      <section className="flex flex-col justify-center px-5 pb-7">
        <Header />
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold py-2 text-gray-500">
              Here you can manage your all Users!
            </p>
            <Link
              className="bg-[#002884] py-2 px-5 rounded-md text-white"
              href={"/dashboard/settings/users/add_user"}
            >
              Add User
            </Link>
          </div>
          <Table />
        </div>
      </section>
    </>
  );
};
//
export default ShowUsersPage;
//
