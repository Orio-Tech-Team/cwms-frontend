export default function replaceNullWithEmptyString(obj: any) {
  for (const key in obj) {
    if (obj[key] === null) {
      obj[key] = "";
    } else if (typeof obj[key] === "object") {
      replaceNullWithEmptyString(obj[key]);
    }
  }
  return obj;
}
