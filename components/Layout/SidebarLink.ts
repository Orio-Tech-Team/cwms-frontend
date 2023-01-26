import { AiOutlineUnorderedList } from "react-icons/ai";
import { BiCategoryAlt, BiReceipt } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { BsBoxSeam, BsShop } from "react-icons/bs";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { RiAddFill, RiTestTubeLine } from "react-icons/ri";

//
const NavLinkData: any[] = [
  {
    label: "Products",
    icon: BsBoxSeam,
    hasChildren: true,
    children: [
      {
        label: "Show Products",
        link: "/dashboard/products/",
        icon: AiOutlineUnorderedList,
      },
      {
        label: "Add Product",
        link: "/dashboard/products/add_product?id=add",
        icon: RiAddFill,
      },
    ],
  },
  {
    label: "Categories",
    icon: BiCategoryAlt,
    hasChildren: true,
    children: [
      {
        label: "Show Categories",
        link: "/dashboard/categories/",
        icon: AiOutlineUnorderedList,
      },
      {
        label: "Add Category",
        link: "/dashboard/categories/add_category?id=add",
        icon: RiAddFill,
      },
    ],
  },
  {
    label: "Vendors",
    icon: BsShop,
    hasChildren: true,
    children: [
      {
        label: "Show Vendors",
        link: "/dashboard/vendors/",
        icon: AiOutlineUnorderedList,
      },
      {
        label: "Add Vendor",
        link: "/dashboard/vendors/add_vendor?id=add",
        icon: RiAddFill,
      },
    ],
  },
  {
    label: "Manufacturers",
    icon: MdOutlinePrecisionManufacturing,
    hasChildren: true,
    children: [
      {
        label: "Show Manufacturers",
        link: "/dashboard/manufacturer/",
        icon: AiOutlineUnorderedList,
      },
      {
        label: "Add Manufacturer",
        link: "/dashboard/manufacturer/add_manufacturer?id=add",
        icon: RiAddFill,
      },
    ],
  },
  {
    label: "Purchase Order",
    icon: BiReceipt,
    hasChildren: true,
    children: [
      {
        label: "Show Purchase Order",
        link: "/dashboard/purchase_order/",
        icon: AiOutlineUnorderedList,
      },
      {
        label: "Add Purchase Order",
        link: "/dashboard/purchase_order/add_purchase_order",
        icon: RiAddFill,
      },
      {
        label: "Create GRN",
        link: "/dashboard/purchase_order/create_grn",
        icon: CgNotes,
      },
      {
        label: "Quality Check",
        link: "/dashboard/purchase_order/quality_check",
        icon: RiTestTubeLine,
      },
    ],
  },
];

export default NavLinkData;
