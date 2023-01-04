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
