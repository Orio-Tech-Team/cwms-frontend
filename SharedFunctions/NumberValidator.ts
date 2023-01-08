export const numberValidatorFunction = (
  value: string,
  func: (val: any) => void
) => {
  var validationRegex = /^[0-9]+$/;
  if (value.match(validationRegex) || value === "") {
    func(value);
  }
};
export const decimalNumberValidatorFunction = (
  value: string,
  func: (val: any) => void
) => {
  var validationRegex = /^[0-9]\d*\.?\d*$/;
  if (value.match(validationRegex) || value === "") {
    func(value);
  }
};
type PropType = "number" | "double" | "phone" | "email";
export const formValidator = (values: string, name: string, type: PropType) => {
  const numberRegex = /^[0-9]+$/;
  const decimalRegex = /^[0-9]\d*\.?\d*$/;
  const emailRegex = /^\S+@\S+$/;
  //
  if (type === "number") {
    if (values.match(numberRegex) || values == "") {
      return null;
    }
    return "Please Enter Valid Number";
  }
  //
  if (type === "double") {
    if (values.match(decimalRegex) || values == "") {
      return null;
    }
    return "Please Enter Valid Number";
  }
  //
  if (type === "phone") {
    if (+values.charAt(0) != 0) {
      return "Phone number must start with 0 (e.g. 0300)";
    }
    if (values.length > 11) {
      return "Phone number cannot be greater than 11!";
    }
    if (values.match(numberRegex) || values == "") {
      return null;
    }
    return "Please Enter Valid Phone Number";
  }
  //
  if (type === "email") {
    if (values.match(emailRegex) || values == "") {
      return null;
    }
    return "Please Enter Valid Email";
  }
};
