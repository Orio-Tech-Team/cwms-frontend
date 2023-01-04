import { atom } from "recoil";
export const productAtom = atom({
  key: "product_data",
  default: [],
});
export const productVendorAtom = atom({
  key: "product_vendor_data",
  default: [],
});
export const productConversionAtom = atom({
  key: "product_conversion_data",
  default: [],
});
