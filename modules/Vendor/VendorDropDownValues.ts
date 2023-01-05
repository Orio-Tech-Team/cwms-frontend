import duplicationRemoverFunction from "../../SharedFunctions/DuplicationRemoverFunction";

const data = {
  procurement_category: ["Pharmaceutical", "Medical Supplies", "Local", "FMCG"],
  vendor_classification: ["Retail", "Institution", "Retail/Institution"],
  city: [
    "Karachi",
    "Lahore",
    "Hyderabad",
    "Faisalabad",
    "Islamabad",
    "Rawalpindi",
  ],
  stock_return_policy: ["No", "3 Months", "6 Months"],
  payment_terms: ["30D", "ADV", "7D", "15D"],
  method_of_payment: ["Cheque", "Online", "RTGS", "PayOrder"],
  line_of_business: [
    "Medical Devices",
    "Medical Supplies",
    "Hygiene Products",
    "Medicine",
    "Disinfectant Solutions",
    "Medicine",
    "FMCG",
    "Health Nutrition",
    "Medical Equipments/ Supplies",
    "Medicine/ Medical Supplies",
    "FMCG Supplies",
  ],
};
export const VendorDropDownValues = {
  procurement_category: duplicationRemoverFunction(data.procurement_category),
  vendor_classification: duplicationRemoverFunction(data.vendor_classification),
  stock_return_policy: duplicationRemoverFunction(data.stock_return_policy),
  city: duplicationRemoverFunction(data.city),
  payment_terms: duplicationRemoverFunction(data.payment_terms),
  method_of_payment: duplicationRemoverFunction(data.method_of_payment),
  line_of_business: duplicationRemoverFunction(data.line_of_business),
};
