import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
//
interface WarehouseGeneral {
  acc_no: string;
  loc_no: string;
  id: number;
  created_at: Date;
  updated_at: Date;
}
export interface PathType extends WarehouseGeneral {
  path_id: string;
}
export interface SideType extends WarehouseGeneral {
  path_id: string;
  side_id: string;
}
export interface RackType extends WarehouseGeneral {
  rack_id: string;
  side_id: string;
}
export interface BinType extends WarehouseGeneral {
  rack_id: string;
  bin_id: string;
  sorting?: number;
}

const PathAtom = atom({
  key: "path_data",
  default: [] as PathType[],
});
const SideAtom = atom({
  key: "side_data",
  default: [] as SideType[],
});
const RackAtom = atom({
  key: "rack_data",
  default: [] as RackType[],
});
const BinAtom = atom({
  key: "bin_data",
  default: [] as BinType[],
});
//
type WarehouseType = {
  pathData: PathType[];
  sideData: SideType[];
  rackData: RackType[];
  binData: BinType[];
  refresh: () => void;
};
//
const useWarehouseData = (): WarehouseType => {
  const [pathData, setPathData] = useRecoilState(PathAtom);
  const [sideData, setSideData] = useRecoilState(SideAtom);
  const [rackData, setRackData] = useRecoilState(RackAtom);
  const [binData, setBinData] = useRecoilState(BinAtom);
  //
  const pathFetcher = async () => {
    const pathResponse = await axiosFunction({ urlPath: "/wms/path/find_all" });
    setPathData(pathResponse.data);
  };
  const sideFetcher = async () => {
    const sideResponse = await axiosFunction({ urlPath: "/wms/side/find_all" });
    setSideData(sideResponse.data);
  };
  const rackFetcher = async () => {
    const rackResponse = await axiosFunction({
      urlPath: "/wms/shelf/find_all",
    });
    setRackData(rackResponse.data);
  };

  const binFetcher = async () => {
    const binResponse = await axiosFunction({ urlPath: "/wms/bin/find_all" });
    setBinData(binResponse.data);
  };

  //
  const refresh = async () => {
    await pathFetcher();
    await sideFetcher();
    await rackFetcher();
    await binFetcher();
  };
  //
  useEffect(() => {
    if (pathData.length === 0) {
      pathFetcher();
    }
  }, []);
  //
  useEffect(() => {
    if (sideData.length === 0) {
      sideFetcher();
    }
  }, []);
  //
  useEffect(() => {
    if (rackData.length === 0) {
      rackFetcher();
    }
  }, []);
  //
  useEffect(() => {
    if (binData.length === 0) {
      binFetcher();
    }
  }, []);
  //
  return { pathData, sideData, rackData, binData, refresh };
};
export default useWarehouseData;
