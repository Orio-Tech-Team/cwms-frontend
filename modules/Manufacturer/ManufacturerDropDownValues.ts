import duplicationRemoverFunction from "../../SharedFunctions/DuplicationRemoverFunction";

const data = {
  line_of_business: [
    "Medical Devices",
    "Medical Supplies",
    "Hygiene Products",
    "Medicine",
    "Disinfectant Solutions",
    "Medicine",
    "FMCG",
    "Medical Equipments/ Supplies",
    "Medicine/ Medical Supplies",
    "FMCG Supplies",
  ],
};
const ManufacturerDropDownValues = {
  line_of_business: duplicationRemoverFunction(data.line_of_business),
};
export default ManufacturerDropDownValues;
