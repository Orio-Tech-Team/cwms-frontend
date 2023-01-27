import duplicationRemoverFunction from "../../SharedFunctions/DuplicationRemoverFunction";

const data = {
  sku_department: [
    "SURGICAL",
    "HEALTH CARE PRODUCTS",
    "CONFECTIONARY",
    "MEDICINES",
    "CONSUMER",
    "COMPOUNDING",
  ],
  item_nature: ["Refrigerator", "Room Temperature", "Narcotics"],
  tax_code: ["GST 15%", "GST 17%", "Advance WHT"],
  purchasing_unit: ["Carton"],
  selling_unit: [["Carton"], ["Box", "Pieces"], ["Pieces", "Strips"]],
  item_release_level: ["POS", "ECOM", "Both"],
  price_levels: ["Special Sale", "Promotion"],
  stock_nature: ["Stock / Non Stock", "Internal Consumption"],
  bar_code: ["QR Code", "2D Code", "1D Code"],
  item_storage_location: ["Aisle", "Racks", "Shelf Level"],
  item_tracking_level: ["Batch", "Expiry"],
  sales_tax_group: [
    "0% GST",
    "1% GST",
    "4% GST",
    "19% GST",
    "17% GST",
    "20% GST",
  ],
};
export const ProductDropDownData = {
  sku_department: duplicationRemoverFunction(data.sku_department),
  item_nature: duplicationRemoverFunction(data.item_nature),
  tax_code: duplicationRemoverFunction(data.tax_code),
  purchasing_unit: duplicationRemoverFunction(data.purchasing_unit),
  selling_unit: duplicationRemoverFunction(data.selling_unit),
  item_release_level: duplicationRemoverFunction(data.item_release_level),
  price_levels: duplicationRemoverFunction(data.price_levels),
  stock_nature: duplicationRemoverFunction(data.stock_nature),
  bar_code: duplicationRemoverFunction(data.bar_code),
  item_storage_location: duplicationRemoverFunction(data.item_storage_location),
  item_tracking_level: duplicationRemoverFunction(data.item_tracking_level),
  sales_tax_group: duplicationRemoverFunction(data.sales_tax_group),
};
