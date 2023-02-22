export default function fileHandler(file: File | null): boolean {
  if (file == null) {
    return true;
  }
  //
  if (file.name.substring(file.name.indexOf(".") + 1) != "csv") {
    return true;
  }
  //
  if (file.size > 10 * 1024 * 1024) {
    return true;
  }
  //
  return false;
}
