"use client";
import { Button, Select } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import useWarehouseData from "../../modules/Warehouse/UseWarehouseData";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
//
function Header() {
  return (
    <div className="mt-5 mb-7 select-none">
      <BreadcrumbComponent />
      <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
        Warehouse Structuring
      </h1>
      <p className="text-gray-500">Here you can structure your Warehouse</p>
    </div>
  );
}
//
function Form() {
  const { binData, pathData, rackData, sideData, refresh } = useWarehouseData();
  //
  const [pathId, setPathId] = React.useState<string>("");
  const [pathSideId, setPathSideId] = React.useState<string>("");
  const [sideId, setSideId] = React.useState<string>("");
  const [shelfId, setShelfId] = React.useState<string>("");
  //
  const [sideDataTemp, setSideDataTemp] = React.useState<any[]>([]);
  const [rackDataTemp, setRackDataTemp] = React.useState<any[]>([]);
  const [refreshTemp, setRefreshTemp] = React.useState<boolean>(false);
  React.useEffect(() => {
    var sideTemp = [...sideData];
    sideTemp = sideTemp.filter((each_side) => {
      return each_side.side_id.includes(pathId);
    });
    setSideId("");
    setSideDataTemp(sideTemp);
    refresh();
  }, [pathId, refreshTemp]);
  //
  React.useEffect(() => {
    var shelfTemp = [...rackData];
    shelfTemp = shelfTemp.filter((each_shelf) => {
      return each_shelf.side_id === sideId;
    });
    setShelfId("");
    setRackDataTemp(shelfTemp);
    refresh();
  }, [sideId, refreshTemp]);
  //
  async function addPath() {
    await axiosFunction({
      urlPath: "/wms/path/add_path",
      method: "post",
    });
    refresh();
  }
  //
  async function addSide() {
    if (pathId == "" && pathSideId == "") {
      showNotification({
        title: "Error",
        message: "Path ID and Path Side ID cannot be empty!",
        color: "red",
        autoClose: 2000,
        disallowClose: true,
      });
      return;
    }
    const response = await axiosFunction({
      urlPath: "/wms/side/add_side",
      method: "post",
      data: {
        path_id: pathId,
        path_side_id: pathSideId,
      },
    });
    if (response.status == 501) {
      showNotification({
        title: "Error",
        message: "Side already exists!",
        color: "red",
        autoClose: 2000,
        disallowClose: true,
      });
    }
    setRefreshTemp((pre) => !pre);
    refresh();
  }
  //
  const addShelf = async () => {
    if (sideId == "") {
      showNotification({
        title: "Error",
        message: "Side ID cannot be empty!",
        color: "red",
        autoClose: 2000,
        disallowClose: true,
      });
      return;
    }
    await axiosFunction({
      urlPath: "/wms/shelf/add_shelf",
      method: "post",
      data: { side_id: sideId },
    });
    setRefreshTemp((pre) => !pre);
    refresh();
  };
  //
  const addBin = async () => {
    if (shelfId == "") {
      showNotification({
        title: "Error",
        message: "Shelf ID cannot be empty!",
        color: "red",
        autoClose: 2000,
        disallowClose: true,
      });
      return;
    }
    await axiosFunction({
      urlPath: "/wms/bin/add_bin",
      method: "post",
      data: { rack_id: shelfId },
    });
    refresh();
  };
  //
  return (
    <>
      <div className="p-5 flex flex-col gap-5">
        <Button
          onClick={addPath}
          className="bg-red-500 hover:bg-red-900 transition-all w-48"
        >
          Add Path
        </Button>
        <Select
          value={pathId}
          onChange={(value: string) => {
            setPathId(value);
          }}
          className="w-[100%]"
          placeholder="Select Path"
          label="Path ID"
          size="md"
          required
          withAsterisk
          data={pathData.map((path) => {
            return path.path_id;
          })}
        />
        <Select
          value={pathSideId}
          onChange={(value: string) => {
            setPathSideId(value);
          }}
          className="w-[100%]"
          placeholder="Select Side ID"
          label="Path Side ID"
          size="md"
          required
          withAsterisk
          data={["R01", "L01"]}
        />
        <Button
          onClick={addSide}
          className="bg-red-500 hover:bg-red-900 transition-all w-48"
        >
          Add Path Side
        </Button>
        <Select
          value={sideId}
          onChange={(value: string) => setSideId(value)}
          className="w-[100%]"
          placeholder="Select Side"
          label="Side ID"
          size="md"
          required
          withAsterisk
          data={sideDataTemp.map((side) => {
            {
              return side.side_id;
            }
          })}
        />
        <Button
          onClick={addShelf}
          className="bg-red-500 hover:bg-red-900 transition-all w-48"
        >
          Add Shelf
        </Button>
        <Select
          value={shelfId}
          onChange={(value: string) => setShelfId(value)}
          className="w-[100%]"
          placeholder="Select Shelf"
          label="Shelf ID"
          size="md"
          required
          withAsterisk
          data={rackDataTemp.map((rack) => {
            return rack.rack_id;
          })}
        />
        <Button
          onClick={addBin}
          className="bg-red-500 hover:bg-red-900 transition-all w-48"
        >
          Add Bin
        </Button>
      </div>
    </>
  );
}
//
type Props = {};
export default function WarehouseStructuringPage(props: Props) {
  return (
    <section className="flex flex-col justify-center px-5 pb-7">
      <Header />
      <div className="shadow-xl border border-gray-100 rounded-md bg-white">
        <div className="flex justify-between items-center p-5 border-b-[1px]">
          <p className="font-semibold py-2 text-gray-500">
            Here you can structure your Warehouse!
          </p>
        </div>
        <Form />
      </div>
    </section>
  );
}
